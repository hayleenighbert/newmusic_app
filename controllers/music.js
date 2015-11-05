var
    http = require('http'),
    express = require('express'),
    router = express(),
    request = require('request');

router.get('/', function(req, res){
    res.render('music')
});

router.get('/results', function(req, res){
        var searchTerm = req.query.s;
        request("http://developer.echonest.com/api/v4/artist/search?"+process.env.API_KEY+"&format=json&name=" + searchTerm, 
        function (error, response, data){
            res.render('musicresults', {myData: JSON.parse(data)})
        })
    });

// router.get('/results', function(req, res){
//             res.render('musicresults', {myData: chunk})
// });

var exports = module.exports = router;