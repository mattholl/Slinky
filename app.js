// Soundcloud client ID
var CLIENT_ID = '86961c923d1a04425a46ac1a4a19c675';

var express = require('express'),
    fs = require('fs'),
    compression = require('compression'),
    hbs = require('hbs'),
    url = require('url'),
    path = require('path'),
    mime = require('mime'),
    http = require('http');

app = express();
app.use(compression());

var router = express.Router();
router.use('/proxy', function(req, res, next) {

    var urlParts = url.parse(req.url, true);
    var query = urlParts.query.url;

    var scURL = url.parse(query);

    var scReq = {
        host : scURL.host, //'api.soundcloud.com'
        port : 80,
        path : scURL.pathname + '.json?client_id=' + CLIENT_ID //'/tracks/49593184/stream?client_id86961c923d1a04425a46ac1a4a19c675'
    };

    // Get media url from sc
    var requestToSC = http.get(scReq, function(scRes) {

        if(scRes.statusCode == 302) {
            var mediaLocation = scRes.headers.location;

            // Parse media url and compile options for another request
            var parsedMediaURL = url.parse(mediaLocation);

            var scMedia = {
                host : parsedMediaURL.host,
                port : 80,
                path : parsedMediaURL.pathname + parsedMediaURL.search
            };

            // Do the media request and pipe back to the client
            var requestForMedia = http.get(scMedia, function(responseFromMedia) {
                // console.log(responseFromMedia);
                responseFromMedia.pipe(res);
            });

            // requestForMedia.on('error', function(error) {
            //     // res.writeHead(404);
            //     // res.end();
            //     next();
            // });

        } else {
            // res.writeHead(404);
            // res.end();
            // next();
        }
    });

    // requestToSC.on('error', function(error) {
    //     res.writeHead(404);
    //     res.end();
    // });

    // next();
});

app.use(router);
app.use(express.static(__dirname + '/public'));

// var app = http.createServer(function(requestToNode, responseToClient) {

//     var parsed = url.parse(requestToNode.url, true);

//     console.log(parsed);

//     if(parsed.pathname == '/proxy') {
//         var scURL = parsed.query.url;
//         var parsedSCURL = url.parse(scURL);

//         var requestOptions = {
//             host : parsedSCURL.host, //'api.soundcloud.com'
//             port : 80,
//             path : parsedSCURL.pathname + '.json?client_id=' + client_id //'/tracks/49593184/stream?client_id86961c923d1a04425a46ac1a4a19c675'
//         };


//         //get media url from sc
//         var requestToSC = http.get(requestOptions, function(responseFromSC) {
//             if(responseFromSC.statusCode == 302) {
//                 var mediaLocation = responseFromSC.headers.location;

//                 //parse media url and compile options for another request
//                 var parsedMediaURL = url.parse(mediaLocation);

//                 var options = {
//                     host : parsedMediaURL.host,
//                     port : 80,
//                     path : parsedMediaURL.pathname + parsedMediaURL.search
//                 };

//                 //do the media request
//                 var requestForMedia = http.get(options, function(responseFromMedia) {
//                     //stream it back to the client
//                     responseFromMedia.pipe(responseToClient);
//                 });

//                 requestForMedia.on('error', function(error) {
//                     responseToClient.writeHead(404);
//                     responseToClient.end();
//                 });
//             } else {
//                 responseToClient.writeHead(404);
//                 responseToClient.end();
//             }
//         });

//         requestToSC.on('error', function(error) {
//             responseToClient.writeHead(404);
//             responseToClient.end();
//         });
//     }
// });

app.listen(9001);
console.log('slinky server on port 9001');
