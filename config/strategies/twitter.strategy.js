var passport = require('passport');


// Implement twitter oAuth 2.0 Strategy
var TwitterStrategy = require('passport-twitter').Strategy;

module.exports = function () {
    passport.use(new TwitterStrategy({
            consumerKey: 'RUY5sghcWAp0MziiAiqmN78Jx',
            consumerSecret: 'WUKhrMDnJXHw6BYYP7OD7oZrN0mzMV9XpZO6SaLEZRIj3xO6Df',
            callbackURL: "http://localhost:3000/twitter/callback",
            passReqToCallback: true

        },
        function(token, tokenSecret, profile, done) {

            var user = {};
            //user.email = profile.emails[0].value;
            user.image = profile._json.image.url;
            user.displayName = profile.displayName;

            user.twitter = {};
            user.twitter.id = profile.id;
            user.twitter.token = accessToken;

            // debug
            console.log("Profile:"+profile)

            done(null, user);
            //User.findOrCreate({ googleId: profile.id }, function (err, user) {
            //  return done(err, user);
            //});
        }
    ));
}
