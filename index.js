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
const LocalStrategy = require('passport-local').Strategy
const app = express()
const PORT = process.env.PORT || 5000

passport.use(new LocalStrategy(
  { usernameField: 'email'},
  async (email, password, done) => {
    try {
      const user = await db.models.Users.findOne({
        where: {
          email
        }
      });
      if (!user) {
        return done(null, false, { message: "Invalid Credentials"});
      } else if (!await user.correctPassword(password)) {
        return done(null, false, { message: "Invalid Credentials"}); 
      } else {
        return done(null, user);
      }
    } catch (err) {
      done(err);
    }
  }
));


db.sync({force: true}).then(() => {
  // seedDatabase()
  
    app.use(cors({origin:true,credentials: true}));
    app.use(function (req, res, next) {
      res.header('Access-Control-Allow-Credentials', true);
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
      if (req.method === "OPTIONS") {
          return res.status(200).end();
      } else {
          next();
      }
  });
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(morgan('dev'))

    app.use(
      session({
        secret: process.env.SECRET || "SUPER SECRET",
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        // cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 } //30 days
      })
    )

    app.use(passport.initialize())
    app.use(passport.session())

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
    

    // app.get('/', (req, res) => {
    //     res.send("THIS IS THE HOMEPAGE")
    // })
    
    app.use('/api', api_routes)

    app.use((err, req, res, next) => {
      console.error(err);
      console.error(err.stack);
      res.status(err.status || 500).send(err.message || "Internal server error");
    })
    
    app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
})
