var
    http = require('http'),
    express = require('express'),
    router = express();

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
        function (response){
            response.on('data', function (chunk){
                var data=JSON.parse(chunk);
                // res.send(JSON.parse(chunk));
                res.render('musicresults', {myData: data})
            })
        });


});

router.get('/results', function(req, res){
            res.render('musicresults', {myData: chunk})
});

var exports = module.exports = router;