// Soundcloud client ID
var CLIENT_ID = '86961c923d1a04425a46ac1a4a19c675';

var express = require('express'),
    fs = require('fs'),
    compression = require('compression'),
    hbs = require('hbs'),
    url = require('url'),
    path = require('path'),
    mime = require('mime');

app = express();
app.use(compression());

var router = express.Router();
router.use('/proxy', function(req, res, next) {

    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;

    console.log(query);
    next();
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
//     } else {
//         //send the static files
//         requestToNode.addListener('end', function() {

//             var uri = 'public' + url.parse(requestToNode.url).pathname, //= parsed.pathname
//                 filename = path.join(process.cwd(), uri); //= full filesystem path
//             console.log(uri);
//             path.exists(filename, function(exists) {

//                 if(!exists) {
//                     responseToClient.writeHead(404, {"Content-Type": "text/plain"});
//                     responseToClient.write(filename + "\n");
//                     responseToClient.write("404 Not Found\n");
//                     responseToClient.end();
//                     return;
//                 }

//                 if (fs.statSync(filename).isDirectory()) {
//                     filename += 'index.html';
//                 }

//                 fs.readFile(filename, "binary", function(error, file) {
//                     if(error) {
//                         responseToClient.writeHead(500, {"Content-Type": "text/plain"});
//                         responseToClient.write(error + "\n");
//                         responseToClient.end();
//                         return;
//                     }

//                     var type = mime.lookup(filename);

//                     responseToClient.writeHead(200, {
//                         "Content-Type" : type
//                     });

//                     responseToClient.write(file, "binary");
//                     responseToClient.end();
//                 });
//             });
//         });
//     }
// });

app.listen(9001);
console.log('slinky server on port 9001');
