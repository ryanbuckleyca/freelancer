const path = require('path')
require('dotenv').config();

// const path = require('path')
const port = process.env.PORT || 9000;
const db = require('./models');
const express = require('express');
const app = express();

const checkJwt = require('./routes/authenticate');
const secureRoute = require('./routes/secure');
const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const contractRoutes = require('./routes/contracts');
const mailingListRoute = require('./routes/mailingList');

const createError = require('http-errors');
const cors = require('cors');
if(req.app.get('env') === 'development') {
  const logger = require('morgan');
  app.use(logger('dev'));
}

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES (secured ones require checkJwt middleware)
app.use("/api/secure", checkJwt, secureRoute);
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/mailinglist", mailingListRoute);
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, '/build/index.html'))
})

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
