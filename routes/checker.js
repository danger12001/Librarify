var mysql = require('mysql');
module.exports = function(req, res){
  var user = req.session.username;
  var dbOptions = {
    host: '127.0.0.1',
    user: 'root',
    // password: '5550121a',
    password: 'coder123',
    port: 3306,
    database: "librarifyDB"
  };
var connection = mysql.createConnection(dbOptions);


  connection.query('select * from `users` where username = ?', user, function(err, registered){
if (err) console.log(err);
connection.query('select * from info where username = ?', user, function(err, email){
if (err) console.log(err);

    var data = {
      registered: false,
      email: email[0].email
    }
    if(registered[0].registered == 1){
      data.registered = true;
    }
    else {
      data.registered = false;
    }

    return data;
});
  });
};
