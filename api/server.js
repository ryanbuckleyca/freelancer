require('dotenv').config();

var express = require('express');
var app = express();

const db = require('./models');
const userRoutes = require('./routes/users');

const port = process.env.PORT || 9000;

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

// ROUTES (secured ones require checkJwt middleware)
const checkJwt = require('./authenticate');

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

// GET CLIENT
// TODO: should require authentication
app.get("/api/clients/:id", async (req, res) => {
  try {
    const client = await db.Client.findOne({
      where: { id: req.params.id },
      include: db.Address
    })
    console.log("SUCCESS: found client by id: req.params.id = ", client)
    parsePerson(client) && res.send(parsePerson(client));
  }
  catch(err) {
    console.log("ERROR: find client by id: req.params.id = ", err);
  }
});

app.use("/api/users", userRoutes);




// ADD MAILING LIST SUBSCRIBER
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
