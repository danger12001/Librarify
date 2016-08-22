module.exports = function(connection){

  var getData = function(query,user, cb){
      connection.query(query, user,cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.showPics = function(user,cb){
    getData('SELECT img FROM users where username = ?',user, cb );
  };

  this.insertPic = function (user,data, cb) {
      insertData('update users SET ? where username = ?', [ data, user], cb );
  };
};
