var bcrypt = require('bcryptjs');
var lockCount = 0;
var pin = require('./pin');

module.exports = function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    req.getConnection(function(err, connection) {

        connection.query('SELECT * FROM users where username = ?', username, function(err, users) {
          if(users[0] === undefined){
            req.flash("warning", 'Invalid username or password');
            return res.redirect("/login");
          }
          var user = users[0];
          var id = user.id;

            if (user.locked === 0) {

                bcrypt.compare(password, user.password, function(err, match) {
                    if (match) {
                      // var admin = user.admin;
                      // console.log(user.username);
                      if(user.username.match(username)){
                        req.session.username = user.username;

                        var otp = pin.generate();
                        bcrypt.hash(otp, 10 , function(err, hash){
                          otp = hash;

                          var data = {one_time_pin: otp};
                        connection.query('update `users` set ? where username = ?', [data, req.session.username], function(err, rows){
                          if(err) console.log(err);

                        });
                      });
                      }
                      else {
                        req.flash('warning', 'Invalid username or password');
                        return res.redirect("/login");
                      }
                        // console.log("Logged in as" + req.session.user);
                        if(user.admin === 1){
                        req.session.admintab = {
                          admin: req.session.username
                        };
                      }
                      // console.log("Logged in as: " + (req.session.username));
                        return res.redirect("/");
                    }
                    else {
                        lockCount ++;
                        if (lockCount === 3) {
                          if(lockCount >= 3){
                            lockCount = 0;
                          }
                            connection.query('UPDATE users SET locked = 1 WHERE id = ?', [id], function(err, rows) {
                                req.flash('warning', 'Account locked');
                                return res.redirect("/login");
                            });
                        }

                        else {
                          req.flash('warning', 'Invalid username or password');
                          return res.redirect("/login");
                          }
                        }
                    });
            }
             else {
                req.flash('warning', 'Account locked');
                return res.redirect("/login");
            }
        });
    });
};
