var bcrypt = require('bcryptjs');
module.exports = function(req,res){
    req.getConnection(function(err, connection) {
var user = req.session.username;

  var verification = req.body.one_time_pin;
  // bcrypt.hash(verification, 10, function(err, hash) {
  connection.query('select * from users where one_time_pin = ?', verification, function(err, results){
    if(results.length !== 1){
      req.flash('warning', "NOT VERIFIED");
      res.redirect('/verify');
    }
    else {


    // console.log(hash);
    // console.log(results[0].one_time_pin);
  bcrypt.compare(results[0].one_time_pin, verification, function(err, match) {
      if (!match && results[0].registered  ==  1) {
        var data = {
          one_time_pin: ""
        };
        connection.query('update users set ? where one_time_pin = ?', [data, verification], function(err, result){
          if(err) console.log(err);
          req.flash('warning', "Verified : Thank you " + results[0].username);
          res.redirect('/verify');

      });
      }
    });
  }

});




});
// });
};
