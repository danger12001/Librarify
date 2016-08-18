var mysql=require('mysql');

exports.update=function(req, res){
  var data = {
    name: req.body.date,
    surname : req.body.surname,
    address: req.body.address,
    ID_number: req.body.ID_number,
    cell_number: req.body.cell_number,
    email: req.body.email
		};
		var username = req.session.username;

    req.getConnection(function(err, connection){
		if (err) return next(err);
		connection.query('UPDATE info SET ? WHERE username = ?', [data, username], function(err, rows){
			if (err) return next(err);
      		// res.redirect('/editDetails');
		});
    });

};
