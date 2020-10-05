require('dotenv').config();

var express = require('express');
var app = express();

const db = require('./models');

const port = process.env.API_PORT || 9000;

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

// allow CORS
app.use(cors())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});


const checkJwt = require('./authenticate');

// ROUTES (secured ones require checkJwt middleware)

app.get("/db", checkJwt, async (req, res) => {
  try {
    const ryan = await db.User.findAll(
      { where: { id: 1 } } // should return Ryan Buckley
    );
    console.log("db.User.findAll({where:{id:1}}): ", ryan)
    res.send({'res': ryan});
  } catch (error) {
    res.send({'res':`error: ${error}`});
  }
});

// TODO: should require authentication
app.get("/users/findByAuth0/:auth0_id", async (req, res) => {
  const user = await db.User.findOne(
    { where: { auth0_id: req.params.auth0_id } }
  );
  console.log("find by auth0_id: req.params.auth0_id = ", user)
  res.send(user);
});

// TODO: should require authentication
app.post("/users/create/", async (req, res) => {
  console.log('create user called with req.body:', req.body);
  const newUser = await db.User.create({
    auth0_id: req.body.auth0_id,
    name: req.body.name,
    email: req.body.email,
    number: req.body.number
  });
  console.log("created new unsaved user: ", newUser);
  const save = await newUser.save();
  console.log("inserted into database: ", save);
  res.send(newUser);
});

// TODO: should require authentication
app.put("/users/update/:id", async (req, res) => {
  console.log('update user called with req.body:', req.body);
  const id = req.params.id
  const { name, email, number } = req.body
  const user = await db.User.findOne({ where: { id } })
  if (name) user.name = name
  if (email) user.email = email
  if (number) user.number = number
  const save = await user.save()
  res.send(save);
});


app.get("/test", (req, res) => {
  res.send({
    msg: "Route /test.",
  });
});


// The "catchall" handler: for any request that doesn't
// match the ones above, send back React's index.html file.
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '/../client/build/index.html'));
// });

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/../client/build')));

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
