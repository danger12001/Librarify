// var queryBuilder = require('./queryBuilder');
var mysql = require('mysql');
module.exports = function(req,res){
var user =  req.session.username;
  var dbOptions = {
    host: '127.0.0.1',
    user: 'root',
    password: 'password1!',
    port: 3306,
    database: "librarifyDB"
  };
var connection = mysql.createConnection(dbOptions);

var data = {
  name:req.body.name,
   surname:req.body.surname,
    address:req.body.address,
     cell_number:req.body.cell_number,
      ID_number:req.body.ID_number,
       username:user,
        email:req.body.email
};

    connection.query("INSERT INTO `info` set ?", data, function(err, rows){
    if(err) console.log(err);
    connection.query("update `users` set registered = 1 where username = ?", user, function(err, rows){
      if(err) console.log(err);
    });
    res.redirect('/');
    });


};
