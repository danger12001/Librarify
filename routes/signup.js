var bcrypt = require('bcryptjs');

module.exports = function(req, res, next) {

    req.getConnection(function(err, connection) {
        if (err)
            return next(err);

        var password = req.body.password;
        var passwordVerification = req.body.passwordV;
        var admin = "";
        var locked = "";
        if(req.body.admin === "on"){
          admin = "1";
        }
        else {
          admin = "0";
        }
        if(req.body.locked === "on"){
          locked = "1";
        }
        else {
          locked = "0";
        }

        var data = {
            username: req.body.username,
            admin: admin,
            locked: locked,
            email: req.body.email

        };

        if(data.username.length < 4 || password.length < 4){
          req.flash('warning', "Your username and/or password should not be smaller than 4 characters");
        }
                bcrypt.hash(password, 10, function(err, hash) {
                  if(password === passwordVerification){
                      data.password = hash;
                  }
                  else {
                    req.flash('warning', "Passwords do not match");
                  }


                    connection.query('insert into users set ?', data, function(err, data) {
                         if (err) {
                             res.redirect('/signup');
                         } else {
                             res.redirect('/login');
                         }
            });
      });
    });
};
