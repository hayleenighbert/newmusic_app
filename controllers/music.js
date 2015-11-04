var
    http = require('http'),
    express = require('express'),
    router = express();

router.get('/', function(req, res){
    http.get("http://developer.echonest.com/api/v4/artist/search?api_key=ZJZ4R41VXOVHQNL6P&format=json&name=radiohead&results=1", 
        function (response){
            response.on('data', function (chunk){
                res.send(JSON.parse(chunk));
            })
        });
});

var exports = module.exports = router;