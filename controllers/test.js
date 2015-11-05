var
    http = require('http'),
    express = require('express'),
    router = express(),
    request = require('request');

router.get("/", function(req, res){
	request("http://developer.echonest.com/api/v4/artist/search?api_key="+process.env.API_KEY+"&format=json&mood=happy", 
        function (error, response, data){
        	var data = JSON.parse(data)
            res.send(data)
        })
});

var exports = module.exports = router;