var queryBuilder = require('./queryBuilder');

  this.insertData = function() {
  var QueryService = new queryBuilder(connection);

  var data= {
    name: req.session.name,
    surname: req.session.surname,
    username: req.session.username,
    address: req.session.address,
    cell_number: req.session.cell_number,
    email: req.session.email,
    ID_number: req.session.ID_number
  }


    return QueryService.runQuery("INSERT INTO info SET ? ",[data]);
  };

  };
