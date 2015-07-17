var express = require('express');
var router = express.Router();

router.use('/', function(req, res, next){

    // check to see if user is logged in before access to this page
    if(!req.user){
        res.redirect('/');
    }
})


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', {user: {name: req.user.displayName,
                              image: req.user._json.image.url}});
});

module.exports = router;
