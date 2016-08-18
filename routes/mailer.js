var nodemailer = require('nodemailer');
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var dbOptions = {
  host: '127.0.0.1',
  user: 'root',
  password: '5550121a',
  // password: 'coder123',
  port: 3306,
  database: "librarifyDB"
};
var connection = mysql.createConnection(dbOptions);
module.exports = function(req,res){

var user = req.session.username;

connection.query('select * from `users` where username = ?', user, function(err, registered){
if (err) console.log(err);
connection.query('select * from info where username = ?', user, function(err, email){
if (err) console.log(err);

// console.log(registered[0].registered);

  if(registered[0].registered == 1){
    var data = {registered: true,
            email: email[0].email,
            otp: email[0].one_time_pin};
var pw = '';
            bcrypt.compare(data.otp, data.otp, function(err, match) {
                if (match) {
                  pw = otp;
// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport('smtps://librarify%40gmail.com:5550121a@smtp.gmail.com');

// setup e-mail data with unicode symbols
var mailOptions = {
    from: '"Librarify" <librarify@gmail.com>', // sender address
    to:   data.email, // list of receivers
    subject: 'One Time Pin', // Subject line
    text: 'Hello! your One Time Pin is: ' + pw  // plaintext body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);
});
}
});
}
});
});
};
