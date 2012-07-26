var http = require('http');
    stat = require('node-static');
    url = require('url');
    fs = require('fs');
    path = require('path');
    mime = require('mime');

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
        //console.log(parsed.pathname);
        //just server static files
        //use fs???//??
        //or use nginx to serve static files
        requestToNode.addListener('end', function() {
            
            var uri = url.parse(requestToNode.url).pathname, //=== parsed.pathname
                uri = 'public' + uri;
                
                filename = path.join(process.cwd(), uri); //= ful filesystem path

                if (fs.statSync(filename).isDirectory()) {
                    //filename += 'index.html';
                }

                //filename = '/var/www/slinky/' + filename;

            path.exists(filename, function(exists) {
                //console.log(parsed.pathname);
                //console.log(uri);

                

                if(!exists) {
                    responseToClient.writeHead(404, {"Content-Type": "text/plain"});
                    
                    responseToClient.write(filename + "\n");
                    //responseToClient.write("404 Not Found\n");
                    

                    responseToClient.end();
                    return;
                }

                

                fs.readFile(filename, "binary", function(error, file) {
                    if(error) {
                        responseToClient.writeHead(500, {"Content-Type": "text/plain"});
                        responseToClient.write(error + "\n");
                        responseToClient.end();
                        return;
                    }
                    
                    var type = mime.lookup(filename);
                    
                    responseToClient.writeHead(200, {
                        "Content-Type" : type,
                    });

                    responseToClient.write(file, "binary");
                    responseToClient.end();
                });


            });


            //file.serve(requestToNode, responseToClient);
            
            // responseToClient.writeHead(200, {'Content-Type': 'text/plain'});
            // responseToClient.write('Hello slinky\n');
            // responseToClient.end();
            
        });
    }
});

app.listen(9001);


// server.listen(9001);
console.log('MP3 server on port 9001');
