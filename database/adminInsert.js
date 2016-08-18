var mysql = require('mysql');
var fs = require("fs");
// var myConnection = require('express-myconnection');
var bcrypt = require('bcryptjs');

bcrypt.hash("123", 10, function(err, hash) {

var data = {
  username: "Admin",
  password: hash,
  admin: 1,
  locked: 0,
  registered: 1
};

var adminInsert = String(fs.readFileSync('./sql/admin.sql'));

  var dbOptions = {
    host: '127.0.0.1',
    user: 'root',

    password: 'password1!',

    port: 3306,
    database: "librarifyDB"
  };
var connection = mysql.createConnection(dbOptions);



connection.query(adminInsert, [data], function(err, result) {
  if (err) throw err;
});
    });
