var bcrypt = require('bcryptjs');
module.exports = function(req,res){
  var verification = req.body.one_time_pin;
connection.query('select * from users where one_time_pin = ?', verification, function(err, results){
  bcrypt.compare(results[0].one_time_pin, verification, function(err, match) {
      if (match && results[0].registered  ==  1) {
        console.log("Verified");
      }
      else {
        console.log("Not Verified");
      }
    });

});





};
