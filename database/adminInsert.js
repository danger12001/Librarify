var mysql = require('mysql');
var fs = require("fs");
var myConnection = require('express-myconnection');


var adminInsert = String(fs.readFileSync('./sql/admin.sql'));

  var dbOptions = {
    host: '127.0.0.1',
    user: 'root',
    password: 'mxmaolqk',
    port: 3306,
    database: "librarifyDB"
  };
var connection = mysql.createConnection(dbOptions);


connection.query(adminInsert, [], function(err, result) {
  if (err) throw err;
});
