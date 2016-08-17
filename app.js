var express = require('express'),
    session = require('express-session'),
    mysql = require('mysql'),
    handlebars = require('express-handlebars'),
    bcrypt = require('bcryptjs'),
    bodyParser = require('body-parser'),
    flash = require('express-flash'),
    nodemailer = require('nodemailer');

    var app = express();
    var setup = require('./database/setup');

    function errorHandler(err, req, res, next) {
      res.status(500);
      res.render('error', {
        error: err,
        admin: req.session.admintab,
        user: req.session.username
      });
    }

    app.use(bodyParser.urlencoded({
      extended: false
      }));
    app.use(bodyParser.json());
    app.use(express.static("public"));

    app.use(session({
  secret: 'space cats on synthesizers',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.engine('handlebars', handlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(errorHandler);

// setup.setup();

// Middleware
app.use(function(req, res, next) {
  if (req.path != "/login" && req.path != "/signup") {
      if (!req.session.username) {
        return res.redirect("/login");
    }
  }
  next();
});
// End of setup
app.get('/', function(req, res) {
  res.render("home", {
    admin: req.session.admintab,
    user: req.session.username
  });
});
app.get('/registration', function(req, res) {
  res.render("registration", {
    admin: req.session.admintab,
    user: req.session.username
  });
});
app.get('/editDetails', function(req, res) {
  res.render("editDetails", {
    admin: req.session.admintab,
    user: req.session.username
  });
});
app.get('/login', function(req, res) {
  res.render("login", {
  });
});
app.get('/signup', function(req, res) {
  res.render("signup", {
  });
});
app.get('/verify', function(req, res) {
  res.render("verify", {
  });
});

//starting server
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('librarify is listening at http://%s:%s', host, port);

});
