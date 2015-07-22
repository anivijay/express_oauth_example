var express = require('express');
var router = express.Router();
var facebook = require('../services/facebook')('1643147099255755','90447eba805563a3bfdec82a464330e3');

router.use('/', function(req, res, next){

    if(!req.user){
        res.redirect('/');
    }
    next();
})

/* GET users listing. */
router.get('/', function(req, res) {

    if(req.user.facebook){
        console.log("Inside the facebook router get: users.js");
        console.log("token" + req.user.facebook.token);
        facebook.getImage(req.user.facebook.token,
            function(results){
                console.log("results.url" + results.url);
                req.user.facebook.image = results.url;
                facebook.getFriends(req.user.facebook.token,
                    function(results){
                        console.log("results.freinds" + results);
                        req.user.facebook.friends = results.total_count;
                        res.render('users', {user: req.user});
                    }
                )
            })
    }
    else{
        console.log("Outside the facebook router get: users.js")
        res.render('users', {user: req.user});
    }

});

module.exports = router;
