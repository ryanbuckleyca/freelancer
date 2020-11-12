require('dotenv').config();

const root = require('path').join(__dirname, '/build')
const port = process.env.PORT || 9000;
const db = require('./models');
const express = require('express');
const app = express();

const checkJwt = require('./routes/authenticate');
const userRoutes = require('./routes/users');
const clientRoutes = require('./routes/clients');
const contractRoutes = require('./routes/contracts');
const mailingListRoute = require('./routes/mailingList');

const createError = require('http-errors');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

app.use(express.json());
app.use(express.static(root));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(cors())

// ROUTES (secured ones require checkJwt middleware)
// Auth0 test
app.get("/api/db", checkJwt, async (req, res) => {
  try {
    const ryan = await db.User.findOne(
      { where: { id: 1 } } // should return Ryan Buckley
    );
    res.send({'res': ryan});
  } catch (error) {
    res.send({'res':`error: ${error}`});
  }
});
app.use("/api/users", userRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/contracts", contractRoutes);
app.use("/api/mailinglist", mailingListRoute);

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
