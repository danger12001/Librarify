

var mysql = require('mysql');
var fs = require("fs");
var myConnection = require('express-myconnection');

var createDB = String(fs.readFileSync('./database/sql/createDB.sql'));
var infoFK = String(fs.readFileSync('./database/sql/infoFK.sql'));
var infoTable = String(fs.readFileSync('./database/sql/infoTable.sql'));
var users = String(fs.readFileSync('./database/sql/userTable.sql'));
var adminInsert = String(fs.readFileSync('./database/sql/admin.sql'));

  var dbOptions = {
    host: '127.0.0.1',
    user: 'root',
<<<<<<< HEAD
    password: '12345',
=======
    password: '5550121a',
    // password: 'mxmaolqk',
>>>>>>> 948c472ee568ffcaa8d5a2de532c93f50595a0d9
    port: 3306,
    database: "librarifyDB"
  };
var connection = mysql.createConnection(dbOptions);


exports.setup = function(){

//DB SETUP SQL
connection.query(createDB, [], function(err, result) {
  if (err) throw err;
  // connection.end();
  connection.query(users, [], function(err, result) {
  if (err) throw err;
  // connection.end();
  connection.query(infoTable, [], function(err, result) {
  if (err) throw err;
  // connection.end();
  connection.query(infoFK, [], function(err, result) {
  if (err) throw err;
  // connection.end();

});
});
});
});
};
