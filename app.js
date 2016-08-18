var express = require('express'),
    session = require('express-session'),
    mysql = require('mysql'),
    handlebars = require('express-handlebars'),
    bcrypt = require('bcryptjs'),
    bodyParser = require('body-parser'),
    flash = require('express-flash'),
    myConnection = require('express-myconnection'),
    nodemailer = require('nodemailer');


    var app = express();
    // var DataGrabber = require('./routes/register');
    var register = require('./routes/register');
    var login = require('./routes/login');
    var signup = require('./routes/signup');
    var verify = require('./routes/verify');
    var checker = require('./routes/checker');




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


    var dbOptions = {
      host: '127.0.0.1',
      user: 'root',
      // password: '5550121a',
      password: 'coder123',
      port: 3306,
      database: "librarifyDB"
    };

    app.use(myConnection(mysql, dbOptions, 'single'));
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

app.use(function(req,res,next){
  if (req.session.admintab){
    if(req.path != "/verify"){
      return res.redirect('/verify');
    }
  }
  next();
});;
// End of setup
app.get('/', function(req, res) {
// var data= {
//   registered: true,
//   email: ""
// }


console.log(checker.email);


  res.render("home", {
    admin: req.session.admintab,
    user: req.session.username,

  });
});
app.get('/registration', function(req, res) {
  res.render("registration", {
    admin: req.session.admintab,
    user: req.session.username
  });
});
app.post('/registration',register);

app.get('/editDetails', function(req, res) {
  res.render("editDetails", {
    admin: req.session.admintab,
    user: req.session.username
  });
});
app.get('/login', function(req, res) {
  res.render("login", {
    admin: req.session.admintab,
    user: req.session.username
  });
});
app.post('/login', login);
app.get('/signup', function(req, res) {
  res.render("signup", {
  });
});
app.get('/verify', function(req, res) {
  res.render("verify", {
  });
});
app.post('/verify', verify);
app.get('/signup', function(req, res){
  res.render('signup');
});
app.post('/signup', signup);
//starting server
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('librarify is listening at http://%s:%s', host, port);

});
