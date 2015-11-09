var express = require("express");
var app = express();
var $ = require('cheerio');
var db = require("./models");
var hstore = require('pg-hstore')();
var pg = require('pg');
var test = require("./controllers/test.js")
var cloudinary = require('cloudinary');
var multer  = require('multer');
var upload = multer({ dest: './uploads/' });

var ejsLayouts = require("express-ejs-layouts");
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.set("view engine", "ejs");

app.get('/', function(req, res) {
  res.render('index');
});

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', upload.single('myFile'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    res.send(result);
  });
  // res.send(req.file);
});

app.get('/image/:url', function(req, res) {
  res.render('image', {url: cloudinary.url(req.params.url)});
});

var session = require('express-session');
app.use(session({
	secret: "secretsarecool",
	resave: false,
	saveUninitialized: true
}));

app.use(function(req, res, next) {
	if(req.session.user) {
		db.user.findById(req.session.user).then(function(user) {
			if (user) {
				req.currentUser = user;
				next();
			} else {
				req.currentUser = false;
				next();
			}
		});
	} else {
		req.currentUser = false;
		next();
	}
});

var flash = require('connect-flash');
app.use(flash());

app.use(function(request, result, next) {
	result.locals.currentUser = request.currentUser;
	result.locals.alerts = request.flash();
	next();
})

//in post route
// app.post('/', upload.single('myFile'), function(req, res) {
//   res.send(req.file);
// });


app.use("/", require("./controllers/login"));
app.use("/auth", require("./controllers/auth"));
app.use("/music", require("./controllers/music"));
// app.use("/profile", require("./controllers/profile"))
app.use("/favorite", require("./controllers/favorite"))
// app.use("/test", test)

// app.listen(process.env.PORT || 3000)
app.listen(3000);