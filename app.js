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
    var register = require('./routes/register');
    var login = require('./routes/login');
    var signup = require('./routes/signup');
    var verify = require('./routes/verify');


    var editCRUD=require('./routes/edit');

    var sms = require('./routes/sms');





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
      password: 'password1!',
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
var connection = mysql.createConnection(dbOptions);

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
app.use(function(req, res, next) {
  var path = req.path.split("/")[1];
  if (!req.session.admintab) {
    if (path == "verify") {
      return res.redirect("/");
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
});
// End of setup

app.get('/', function(req, res) {

var user = req.session.username;

connection.query('select * from `users` where username = ?', user, function(err, registered){
if (err) console.log(err);
connection.query('select * from info where username = ?', user, function(err, email){
if (err) console.log(err);

// console.log(registered[0].registered);

  if(registered[0].registered == 1){
    var data = {registered: true,
              number: email[0].cell_number};

            // mailer(req, res);

  res.render("home", {
    admin: req.session.admintab,
    user: req.session.username,
    data: data
  });
}
else {
  res.render("home", {
    admin: req.session.admintab,
    user: req.session.username,

  });
}
});
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
    user: req.session.username,

  });
});

app.post('/editDetails', editCRUD.update);

app.get('/login', function(req, res) {
  res.render("login", {
    admin: req.session.admintab,
    user: req.session.username
  });
});

app.post('/login',function(req, res){
login(req,res);
});


app.get('/verify', function(req, res) {
  res.render("verify", {
    admin: req.session.admintab,
    user: req.session.username
  });
});
app.post('/verify', verify);
app.get('/signup', function(req, res){
  res.render('signup', {  admin: req.session.admintab,
    user: req.session.username});
});
app.post('/signup', signup);


app.get("/logout", function(req, res) {
  delete req.session.username;
  delete req.session.admintab;
  res.redirect("/login");
});
//starting server
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('librarify is listening at http://%s:%s', host, port);

});
