var http = require('http');
    stat = require('node-static');
    url = require('url');
    client_id = '86961c923d1a04425a46ac1a4a19c675';
    
var file = new stat.Server('./public');


var app = http.createServer(function(requestToNode, responseToClient) {
    
    var parsed = url.parse(requestToNode.url, true);
    
    if(parsed.pathname == '/proxy') {
        var scURL = parsed.query.url;
        var parsedSCURL = url.parse(scURL);

        var requestOptions = {
            host : parsedSCURL.host, //'api.soundcloud.com'
            port : 80,
            path : parsedSCURL.pathname + '.json?client_id=' + client_id //'/tracks/49593184/stream?client_id86961c923d1a04425a46ac1a4a19c675'
        };

        //get media url from sc
        var requestToSC = http.get(requestOptions, function(responseFromSC) {
            if(responseFromSC.statusCode == 302) {
                var mediaLocation = responseFromSC.headers.location;
                
                //parse media url and compile options for another request
                var parsedMediaURL = url.parse(mediaLocation);

                var options = {
                    host : parsedMediaURL.host,
                    port : 80,
                    path : parsedMediaURL.pathname + parsedMediaURL.search
                };
                
                //do the media request
                var requestForMedia = http.get(options, function(responseFromMedia) {
                    //stream it back to the client
                    responseFromMedia.pipe(responseToClient);
                });

                requestForMedia.on('error', function(error) {
                    responseToClient.writeHead(404);
                    responseToClient.end();
                });
            } else {
                responseToClient.writeHead(404);
                responseToClient.end();
            }
        });

        requestToSC.on('error', function(error) {
            responseToClient.writeHead(404);
            responseToClient.end();
        });
    } else {
        requestToNode.on('end', function() {
            file.serve(requestToNode, responseToClient);
        });
    }
});

app.listen(9001);
console.log('MP3 server on port 9001');
