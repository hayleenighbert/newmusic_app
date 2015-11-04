var
    http = require('http'),
    express = require('express'),
    router = express(),
    request = require('request');

router.get('/', function(req, res){
    res.render('music')
//     http.get("http://developer.echonest.com/api/v4/artist/search?api_key=ZJZ4R41VXOVHQNL6P&format=json&name=radiohead&results=1", 
//         function (response){
//             response.on('data', function (chunk){
//                 res.send(JSON.parse(chunk));
//             })
//         });
});

router.get('/results', function(req, res){
        var searchTerm = req.query.s;
        request("http://developer.echonest.com/api/v4/artist/search?api_key=ZJZ4R41VXOVHQNL6P&format=json&name=" + searchTerm, 
        function (error, response, data){
            res.render('musicresults', {myData: JSON.parse(data)})
        })
    });

// router.get('/results', function(req, res){
//             res.render('musicresults', {myData: chunk})
// });

var exports = module.exports = router;