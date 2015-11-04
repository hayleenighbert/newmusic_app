var express = require("express");
var router = express.Router();

router.get("/", function(req, res) {
	
	res.render("index");
});

router.get("/login", function(req, res) {
	if (req.currentUser) {
		res.render("/login");
	} else {
		res.redirect("/");
	}
});

module.exports = router;