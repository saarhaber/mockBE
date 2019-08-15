// const express = require('express')
// const path = require('path')

// const db = require('./database')
// const api_routes = require('./routes/api_routes')
// const createLocalDatabase = require('./utils/createLocalDatabase');
// const seedDatabase = require('./utils/seed_data')


// const PORT = process.env.PORT || 5000
// const app = express()

// const syncDatabase = () => {
//   //if in production environment
//   if (process.env.NODE_ENV === 'production') {
//     db.sync();
//   } else {
//     console.log('Force Sync is on');
//     db.sync({force: true})
//       .catch(err => {
//         if (err.name === 'SequelizeConnectionError') {
//           createLocalDatabase()
//         } else {
//           console.error(err);
//         }
//       })
//   }
// }

// // db.sync({force: true}).then(async () => {
// //     seedDatabase()
// // })

// const bootApp = async () => {
//   await syncDatabase();
//   await seedDatabase();
// };
// // syncDatabase()
// // seedDatabase()
// bootApp()

// app.use('/api', api_routes)

// app.use((req,res,next) => {
//   if (path.extname(req.path).length) {
//     const err = new Error('Not found');
//     err.status = 404;
//     next(err);
//   }
// })

// app.use((err,req,res,next) => {
//   console.error(err);
//   console.error(error.stack);
//   res.status(err.status || 500).send(err.message || 'Internal Server Error');
// });



// app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
// Here, we will sync our database, create our application, and export this module so that we can use it in the bin directory, where we will be able to establish a server to listen and handle requests and responses;

// Require environmental variables (if we have any) if we are in development or testing;

// if (process.env.NODE_ENV !== 'production') {
//   require('./secrets');
// }

// Module dependencies;
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const helmet = require('helmet');
// const compression = require('compression');

// Utilities;
const createLocalDatabase = require('./utils/createLocalDatabase');

const PORT = process.env.PORT || 5000

// Our database instance;
const db = require('./database');

// Our apiRouter;
const apiRouter = require('./routes/api_routes');

// A helper function to sync our database;
const syncDatabase = () => {
  if (process.env.NODE_ENV === 'production') {
    db.sync();
  }
  else {
    console.log('As a reminder, the forced synchronization option is on');
    db.sync({ force: true })
      .catch(err => {
        if (err.name === 'SequelizeConnectionError') {
          createLocalDatabase();
        }
        else {
          console.log(err);
        }
      });
    }
};

// Instantiate our express application;
const app = express();

// A helper function to create our app with configurations and middleware;
const configureApp = () => {
  app.use(bodyParser.json())
  // app.use(helmet());
  // app.use(logger('dev'));
  // app.use(express.json());
  // app.use(express.urlencoded({ extended: false }));
  // app.use(compression());
  // app.use(cookieParser());

  // Mount our apiRouter;
  app.use('/api', apiRouter);

  // Error handling;
  app.use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    }
    else {
      next();
    }
  });

  // More error handling;
  app.use((err, req, res, next) => {
    console.error(err);
    console.error(err.stack);
    res.status(err.status || 500).send(err.message || 'Internal server error.');
  });
};

// Main function declaration;
const bootApp = async () => {
  await syncDatabase();
  // await seedDatabase();
  await configureApp();
  
};

// Main function invocation;
bootApp();

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`))
// // Export our app, so that it can be imported in the www file;
// module.exports = app;
