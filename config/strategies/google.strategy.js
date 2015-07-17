var passport = require('passport');


// Implement Google oAuth 2.0 Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function () {
    passport.use(new GoogleStrategy({
            clientID: '1075724239734-sjpdmptp1177aogsm3qtcnp7vg5ndle3.apps.googleusercontent.com',
            clientSecret: 'ixgte-jG-u5db4iFJ8x0YXhK',
            callbackURL: "http://localhost:3000/auth/google/callback"
        },
        function(accessToken, refreshToken, profile, done) {

            var user = {};
            user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.google = {};
            user.google.id = profile.id;
            user.google.token = accessToken;
            console.log("Profile:"+profile)
            done(null, user);
            //User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //  return done(err, user);
            //});
        }
    ));
}

