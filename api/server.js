require('dotenv').config();

var express = require('express');
var app = express();

if (process.env.NODE_ENV === 'production') {
  console.log('Node is running in production');
} else {
  console.log('Node is running in development');
}

var createError = require('http-errors');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// RB: not sure we need the following
// if not using static files in Node
// app.use(express.static(path.join(__dirname, 'public')));
// allow CORS
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// Auth0 authentication middleware
const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");

const port = process.env.API_PORT || 9000;
const appOrigin = process.env.APP_ORIGIN;
const audience = process.env.AUTH0_AUDIENCE;
const issuer = process.env.AUTH0_ISSUER;

if (!issuer || !audience) {
  throw new Error("Please make sure that .env is in place and populated");
}

const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${issuer}.well-known/jwks.json`,
  }),

  audience: audience,
  issuer: issuer,
  algorithms: ["RS256"],
});



// ROUTES (secured ones require checkJwt middleware)
app.get("/db", checkJwt, (req, res) => {
  res.send({
    msg: "Route /db.",
  });
});
app.get("/test", (req, res) => {
  res.send({
    msg: "Route /test.",
  });
});
// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));
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

app.listen(port);

console.log(`Cheque Mate client listening on ${port}`);
