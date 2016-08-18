var bcrypt = require('bcryptjs');
module.exports = function(req,res){

  exports.myFunction=function(){
    var person = prompt("Please anwser the security question:","PLEASE PUT ANSER HERE" );
    if (person !== null) {
        document.getElementById("demo").innerHTML = person ;
        }

  };

  exports.answerVerification=function(){

  var verification = req.body.security_answer;
  connection.query('select * from users where username = ?', verification, function(err, results){
  bcrypt.compare(results[0].security_answer, verification, function(err, match) {
      if (match && results[0].security_answer  ==  verification) {
        console.log("Correct Answer");
      }
      else {
        console.log("Incorrect Answer");
      }
    });

});
};





};
