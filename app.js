var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var fs = require('fs');
var paypal = require('paypal-rest-sdk');

var index = require('./routes/index');
var users = require('./routes/users');
var execute = require('./routes/execute');
var products = require('./routes/products');
var collections = require('./routes/collections');
var signup = require('./routes/signup');
var signin = require('./routes/signin');
var profile = require('./routes/profile');

var app = express();
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://tamtran:123@ds161950.mlab.com:61950/shopping');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));


try {
    var configJSON = fs.readFileSync(__dirname + "/config.json");
    var config = JSON.parse(configJSON.toString());
} catch (e) {
    console.error('File config.json not found or is invalid: ' + e.message);
    process.exit(1);
}
paypal.configure(config.api);

app.use(session({
    secret: 'CLC14-Web-G13-Pete',
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { path: '/', httpOnly: true, maxAge: 60 * 60 * 24 * 7 },
    rolling: true
}));

app.use(function(req, res, next) {
    res.locals.currentUser = req.session.userID;
    next();
});

app.use('/', index);
app.use('/users', users);
app.get('/execute', execute);
app.use('/products', products);
app.use('/collections', collections);
app.use('/signup', signup);
app.use('/signin', signin);
app.use('/profile', profile);
app.use('/update', profile);

var routes_admin = require('./routes/admin');
app.use('/admin', routes_admin);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;