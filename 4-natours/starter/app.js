const express = require('express');
const morgan = require('morgan');
const favicon = require('serve-favicon');
const path = require('path');

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

// 2) Route Handlers

// to make parameters optional, add question mark at the end of it like this: /:y?

// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// or, with a different and prettier syntax:

// 3) Routes (using mounted routers through middleware declarations)
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4) Start Server

module.exports = app;
