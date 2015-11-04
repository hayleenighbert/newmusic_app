var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/:', function(req, res){
	var id = req.params.;
    console.log(id);
	var url = 'http://developer.echonest.com/api/v4/[type]/[method]' + id;
	request(url,
    	function(error, response, body){
        if(!error && response.statusCode === 200){
            var data = JSON.parse(body);
            res.render('profile', {info:data});

        }
    });
});



module.exports = router;