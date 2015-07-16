var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth');

var app = express();

// Implement Google oAuth 2.0 Strategy
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

passport.use(new GoogleStrategy({
      clientID: '1075724239734-sjpdmptp1177aogsm3qtcnp7vg5ndle3.apps.googleusercontent.com'
      clientSecret: 'ixgte-jG-u5db4iFJ8x0YXhK',
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {

      done(null, profile);

      //User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //  return done(err, user);
      //});
    }
));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport & express session initialization

app.use(session({secret: 'SnappShr for the win!!' }));

app.use(passport.initialize());
app.use(passport.session());

// Serialize user and store key in session
passport.serializeUser(function(user,done){
  done(null,user);
});

passport.deserializeUser(function(user,done){
  done(null,user);
});


app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
