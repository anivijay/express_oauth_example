var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')()

router.use('/', function(req, res, next){

    if(!req.user){
        res.redirect('/');
    }
    next();
})

/* GET users listing. */
router.get('/', function(req, res) {
    res.render('users', {user: req.user});
});

module.exports = router;
