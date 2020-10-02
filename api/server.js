var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var testRouter = require('./routes/test');
var dbRouter = require('./routes/db');

var app = express();

if (process.env.NODE_ENV === 'production') {
  console.log('Node is running in production');
} else {
  console.log('Node is running in development');
}

// allow CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// RB: not sure we need the following
// if not using static files in Node
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/test', testRouter);
app.use('/db', dbRouter);

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/../client/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});

const port = process.env.API_PORT || 9000;
app.listen(port);

console.log(`Cheque Mate client listening on ${port}`);
