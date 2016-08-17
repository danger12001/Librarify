var express = require('express'),
    session = require('express-session'),
    mysql = require('mysql'),
    handlebars = require('express-handlebars'),
    bcrypt = require('bcryptjs'),
    bodyParser = require('body-parser'),
    flash = require('express-flash'),
    nodemailer = require('nodemailer');

    var app = express();

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
// End of setup






//starting server
var server = app.listen(3000, function() {

  var host = server.address().address;
  var port = server.address().port;

  console.log('librarify is listening at http://%s:%s', host, port);

});
