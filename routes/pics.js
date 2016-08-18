
module.exports = function(){

  this.showPics = function(req, res, next){
    req.services(function(err, services){
      		var picDataService = services.picDataService;
          picDataService.showPics(function(err, img){
            if(err)	console.log(err);
            res.render('verify', {img:img});
          });

    });
  };

  this.postPic = function(req, res, next){
    req.services(function(err, services){
      		var picDataService = services.picDataService;
          var path = (req.file.path).replace('public/', '');
          var data = {url : path};
          picDataService.insertPic(data, function(err, rows){
            if(err)	throw err;
            res.redirect('/');
          });

    });
  };
};
