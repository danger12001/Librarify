var accountSid = 'AC06d6d9e46b75bcb56fc5b40a72182054';
var authToken = 'dfe4feeeabd8cba575a4acf42aa6c0e0';
var bcrypt = require('bcryptjs');
//require the Twilio module and create a REST client
var twilioClient = require('twilio')(accountSid, authToken);
module.exports = function(request, response, otp){
  var user = request.session.username;
    request.getConnection(function(err, connection) {
  connection.query('select * from `users` where username = ?', user, function(err, result){
  if (err) console.log(err);
  var pin = result[0].one_time_pin;
// console.log(otp);
// console.log(pin);
  bcrypt.compare(pin, otp, function(err, match) {
      if (!match) {

  // console.log(result);
  // console.log(user);
  var body = "Your One Time PIN is: " + otp ;
  var cellnumber = '+27748079473';
  // var cellnumber = '+2748079473';
  // var message = "Your One Time PIN has been sent to: " + '+2748079473' ;

  // console.log('send sms to', cellnumber + ', text', body);

  twilioClient.messages.create({
    to: cellnumber,
    from: '+12107142670',
    body: body,
  }, function (err, message) {
    if (err) {
      console.log(err);
      // response.status(500).send('Unable to send sms: ' + err);
    }
    // console.log(message.sid);
    // response.sendStatus(200);
  });
}
else {
  console.log("error");
}

});
});
});
};
