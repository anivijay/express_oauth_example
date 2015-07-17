var express = require('express'),
    passport = require('passport');
var router = express.Router();

/* Google Authentication Routes */
router.route('/google/callback')
    .get(passport.authenticate('google', {
        successRedirect: '/users',
        failure: '/error'
    }));

router.route('/google')
    .get(passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email']
    }));


/* Twitter Authentication Routes */
router.route('/twitter/callback')
    .get(passport.authenticate('twitter', {
        successRedirect: '/users',
        failure: '/error'
    }));

router.route('/twitter')
    .get(passport.authenticate('twitter'));

module.exports = router;