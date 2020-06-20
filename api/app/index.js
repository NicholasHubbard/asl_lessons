// load in the imports
const error = require('debug')('api:error');
const express = require('express');
const bodyParser = require('body-parser');
const morganDebug = require('morgan-debug');
const cors = require('cors');
// routes
const decisionRouter = require('./routes/decisions');
const optionRouter = require('./routes/options');
const authRouter = require('./routes/auth');
// create an express application
const app = express();
app.use(cors());
// checks to see if the content-type is json and parses it into req.body
app.use(express.json());
// log all requests
app.use(morganDebug('api:request', 'dev'));
// setup the app to use the router at /decisions
app.use('/decisions', decisionRouter);
// setup the app to use the router at /options
app.use('/options', optionRouter);
// setup the app to use the router at /auth
app.use('/auth', authRouter);
// four params are required to mark this as an error handling middleware
//  eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  error('ERROR FOUND:', err);
  console.log(500);
});

// export the express app
module.exports = app;
