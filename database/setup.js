

var mysql = require('mysql');
var fs = require("fs");
var myConnection = require('express-myconnection');

var createDB = String(fs.readFileSync('./sql/createDB.sql'));
var infoFK = String(fs.readFileSync('./sql/infoFK.sql'));
var infoTable = String(fs.readFileSync('./sql/infoTable.sql'));
var users = String(fs.readFileSync('./sql/userTable.sql'));
var adminInsert = String(fs.readFileSync('./sql/admin.sql'));

  var dbOptions = {
    host: '127.0.0.1',
    user: 'root',
    password: 'mxmaolqk ',
    port: 3306,
    database: "librarifyDB"
  };
var connection = mysql.createConnection(dbOptions);


// exports.setup = function(){

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
