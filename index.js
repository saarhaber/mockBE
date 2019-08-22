const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const passport = require('passport')
const bodyParser = require('body-parser')
const session = require('express-session')

const db = require('./database')
const api_routes = require('./routes/api_routes')
const seedDatabase = require('./utils/seed_data')

const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db })
// const LocalStrategy = require('passport-local').Strategy
const app = express()
const PORT = process.env.PORT || 5000

// passport.use(new LocalStrategy(
//   { usernameField: 'email'},
//   async (email, password, done) => {
//     try {
//       const user = await db.models.Users.findOne({
//         where: {
//           email
//         }
//       });
//       console.log("AAAAAAAAAAAAA")
//       if (!user) {
//         console.log("BBBBBBBBBB")
//         return done(null, false, { message: "Invalid Credentials"});
//       } else if (!await user.correctPassword(password)) {
//         console.log("CCCCCCCCCCCC")
//         return done(null, false, { message: "Invalid Credentials"}); 
//       } else {
//         // console.log("DDDDDDDDDDDDDDDD",user)
//         return done(null, user);
//       }
//     } catch (err) {
//       console.log("EEEEEEEEEEEEEE")
//       done(err);
//     }
//   }
// ));

passport.serializeUser((user,done) => {
  console.log("in serialize", user.id)
  return done(null,user.id);
});

passport.deserializeUser(async (id,done) => {
  console.log("in deserialize", id)
  try {
    const user = await db.models.Users.findByPk(id);
    done(null,user);
  } catch (err) {
    done(err);
  }
});

const configureApp = () => {
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(cors({origin:'http://localhost:3000',credentials: true}));
    app.use(morgan('dev'))

    app.use(
      session({
        secret: process.env.SECRET || "SUPER SECRET",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } //30 days,
      })
    )

    
    
    app.use(passport.initialize())
    app.use(passport.session())
    app.use('/api', api_routes)
    
    app.use((err, req, res, next) => {
      console.error(err);
      console.error(err.stack);
      res.status(err.status || 500).send(err.message || "Internal server error");
    })
}

const startListening = () => {
  app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
}

const syncdb = async () => {
  await db.sync({force: true}).then(seedDatabase());
}

const bootApp = async () => {
  await sessionStore.sync();
  await syncdb();
  await configureApp();
  await startListening();
}

bootApp();