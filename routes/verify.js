var bcrypt = require('bcryptjs');

exports.verify = function(req,res){
  var user = req.session.username;
  var verification = req.body.one_time_pin;
connection.query('select * from users where username = ?', user, function(err, results){
  bcrypt.compare(results[0].one_time_pin, verification, function(err, match) {
      if (match) {
        return "Verified";
      }
      else {
        return "Not Verified";
      }
    });

});





};
