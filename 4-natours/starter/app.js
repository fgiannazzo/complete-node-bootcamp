const express = require('express');
const morgan = require('morgan');

const favicon = require('serve-favicon');
const path = require('path');
const globalErrorHandler = require('./controllers/errorController');
const AppError = require('./utils/appError');

// Require Rouiter Files
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

// 1) Middlewares

const app = express();
//third party middleware
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//middleware to receive body requests from POST api requests
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

//custom middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) Routes (using mounted routers through middleware declarations)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  // err.status = 'fail';
  // err.statusCode = 404;

  next(new AppError(`Can't find ${req.originalUrl} on this server!`));
});

// ERROR HANDLING
app.use(globalErrorHandler);

module.exports = app;
