var express = require("express");
var app = express();
var $ = require('cheerio');
var db = require("./models");
var hstore = require('pg-hstore')();
var pg = require('pg');

var ejsLayouts = require("express-ejs-layouts");
app.use(express.static(__dirname + '/static'));
app.use(ejsLayouts);
app.set("view engine", "ejs");

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

var session = require('express-session');
app.use(session({
	secret: "secrets",
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

app.get('/url', function(req, res){
  request('http://pitchfork.com/reviews/best/albums/', function (err, resp, html){
    if(!err && resp.statusCode == 200) {
      var parsedHTML = $.load(html)
      var linkArray = []
      parsedHTML('.bnm-list li div.info a').map(function(i, headline){
        var text = $(headline).attr('href')
        if(!(text)) return
        linkArray.push(text)
      })
      var textArray = []
      parsedHTML('.bnm-list li div.info a').map(function(i, headline){
        var text = $(headline).text()
        if(!(text)) return
        textArray.push(text)
      })
      var linksAndHeadlines = {url: linkArray, info: textArray}
      res.render('index', {url: linkArray, info: textArray})
    }
  })
})


// Include our controllers
app.use("/", require("./controllers/login"));
app.use("/auth", require("./controllers/auth"));
app.use("/music", require("./controllers/music"));
// app.use("/profile", require("./controllers/profile"))
app.use("/favorite", require("./controllers/favorite"))

app.listen(process.env.PORT || 3000)