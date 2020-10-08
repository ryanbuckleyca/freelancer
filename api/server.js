require('dotenv').config();

var express = require('express');
var app = express();

const db = require('./models');

const port = process.env.PORT || 9000;

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
  res.header('Access-Control-Allow-Headers', '*');
  next();
});

const checkJwt = require('./authenticate');

// ROUTES (secured ones require checkJwt middleware)

app.get("/api/db", checkJwt, async (req, res) => {
  try {
    const ryan = await db.User.findOne(
      { where: { id: 1 } } // should return Ryan Buckley
    );
    console.log("db.User.findAll({where:{id:1}}): ", ryan)
    res.send({'res': ryan});
  } catch (error) {
    res.send({'res':`error: ${error}`});
  }
});

// TODO: should require authentication
app.get("/api/users/:auth0_id", async (req, res) => {
  try {
    const user = await db.User.findOne(
      { where: { auth0_id: req.params.auth0_id }, include: db.Address }
    );
    console.log("SUCCESS: find user by auth0_id: req.params.auth0_id = ", user)
    user && res.send(user);
  }
  catch(err) {
    console.log("ERROR: find user by auth0_id: req.params.auth0_id = ", err);
  }
});

// TODO: should require authentication
app.post("/api/users/create/", async (req, res) => {
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
app.put("/api/users/update/:id", async (req, res) => {
  console.log('update user called with req.body:', req.body);
  try {
    const update = await db.User.update(req.body, {
      where: { id: req.body.id },
      include: db.Address
    });
    console.log(`user #${req.body.id} (${req.body.name}) updated!`, res)
    res.send(update);
  }
  catch(err) { console.log('update user error: ', err) }
  // const { name, email, number } = req.body
  // const user = await db.User.findOne(
  //   { where: { id }, include: db.Address }
  // )
  // console.log('user to update is: ', user)
  // user.name = req.body.name;
  // user.email = req.body.email;
  // user.number = req.body.number;
  // // TODO: the following isn't updating address records
  // user.Addresses = req.body.Addresses;
  // const save = await user.save();
  // res.send(save);
});

app.post("/api/mailinglist/add", async (req, res) => {
  try {
    const newSub = await db.Subscriber.create({
      email: req.body.email,
    });
    const save = await newSub.save();
    res.send(newSub);
  }
  catch(err) {
    console.log('add to mailing list error: ', err)
  }
});

app.get("/api/test", (req, res) => {
  res.send({
    msg: "Route /test.",
  });
});


// The "catchall" handler: for any request that doesn't
// match the ones above, send back React's index.html file.
const root = require('path').join(__dirname, '/../client/build')
app.use(express.static(root));
app.get("*", (req, res) => {
    console.log('server.js: non-predefined route called');
    res.sendFile('index.html', { root });
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
