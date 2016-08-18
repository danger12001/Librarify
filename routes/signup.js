var bcrypt = require('bcryptjs');

module.exports = function(req, res, next) {

req.getConnection(function(err, connection) {
    if (err)
        return next(err);

    var password = req.body.password;
    var passwordVerification = req.body.passwordV;
    var admin = 0;
    var locked = 0;

    var data = {
        username: req.body.username,
        admin: admin,
        locked: locked,
        registered: 0
    };

    if (data.username.length < 4 || password.length < 4) {
        req.flash('warning', "Your username and/or password should not be smaller than 4 characters");
    }
    bcrypt.hash(password, 10, function(err, hash) {
        if (password === passwordVerification) {
            data.password = hash;
        } else {
            req.flash('warning', "Passwords do not match");
        }

        connection.query('insert into users set ?', data, function(err, data) {
            if (err) {
                console.log(err);
                res.redirect('/signup');
            } else {
                res.redirect('/login');
            }
        });
    });
});
};
