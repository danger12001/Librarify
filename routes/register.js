var queryBuilder = require('./queryBuilder');

module.exports=function(connection){
  var QueryService = new queryBuilder(connection);

  var data= {
    name: req.session.name,
    surname: req.session.surname,
    username: req.session.username,
    address: req.session.address,
    cell-number: req.session.cell-number,
    email: req.session.email,
    ID-number: req.session.ID-number
  }

  this.insertData = function(data) {
    return QueryService.runQuery("INSERT INTO info SET ? ",data);
  };

  };
