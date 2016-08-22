
module.exports = function(){

  this.showPics = function(req, res, next){
    req.services(function(err, services){
      		var picDataService =  services.picDataService;
          picDataService.showPics(function(err, img){
            if(err)	console.log(err);
            res.render('verify', {img:img});
          });

    });
  };

  this.postPic = function(req, res, next){
    var user = req.session.username;
    req.services(function(err, services){
      		var picDataService = services.picDataService;
          var path = (req.file.path).replace('public/', '');
          var data = {img : path};
          picDataService.insertPic(user,data, function(err, rows){
            if(err)	console.log(err);
            res.redirect('/');
          });

    });
  };
};
