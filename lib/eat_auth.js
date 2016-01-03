var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.headers.token;
  var bodyToken = (req.body) ? req.body.token : '';  
  token = token || bodyToken;
  
  if (!token) {
    console.log('no token');
    return res.status(401).json({msg: 'No token!  Oh dear.'});
  }

  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'authentiCat seyszzz noe!!!1'});
    }

    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'authentiCat seyzzz noe!!!1!!!!!!!!'});
      }

      if (!user) {
        console.log(err);
        return res.status(401).json({msg: 'authentiCat seyzzz noe!!!1l1!!!!!!!!'});

      }

      req.user = user;
      next();
    });
  });
};
