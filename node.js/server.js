// mp3 ../assets/afx.mp3
//http://www.webgl.com/2012/05/webgl-demo-soundcloud-visualization/

////var track_url = "http://soundcloud.com/rob_booth/milanese-espantoso-freebie";

var http = require('http'),
	static = require('node-static'),
	url = require('url'),

	// fileSystem = require('fs'),
	// path = require('path'),
	// util = require('util'),
	client_id = '86961c923d1a04425a46ac1a4a19c675',
	//track_url = 'http://soundcloud.com/rob_booth/milanese-espantoso-freebie';

//http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/rob_booth/milanese-espantoso-freebie&client_id=86961c923d1a04425a46ac1a4a19c675
//http://api.soundcloud.com/resolve.json?url=http://soundcloud.com/s_p_a_c_e_s/wireless&client_id=86961c923d1a04425a46ac1a4a19c675

//https://github.com/oampo/AmbientCloud
//on client


var file = new static.Server('.');


//this will get the track metadata
// var request_opts = {
// 	host: 'api.soundcloud.com',
// 	port: 80,
// 	path: '/resolve.json?url=' + track_url + '&client_id=' + client_id,
// 	method : 'GET',
// 	headers: {
// 		'User-Agent' : 'three.js dancer'
// 	}
// }


var app = http.createServer(function(requestToNode, responseToClient) {
	
	var parsed = url.parse(requestToNode.url, true);
	
	if(parsed.pathname == '/proxy') {
		var scURL = parsed.query.url;
		var parsedSCURL = url.parse(scURL);

		var requestOpts = {
			host : parsedSCURL.host,
			port : 80,
			path : parsedSCURL.pathname + '?client_id' + client_id
		};

		//get media url from sc
		var requestToSC = http.get(options, function(responseFromSC) {
			if(responseFromSC.statusCode = 302) {
				var mediaLocation = responseFromSC.headers.location;

				//parse media url and compile options for another request
				var parsedMediaURL = url.parse(mediaLocation);
				var options = {
					host : parsedMediaURL.host,
					port : 80,
					path : parsedMediaURL.pathName + parsedMediaURL.search
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

app.listen(2000);
console.log('MP3 server on port 2000');

// var sc_resolve = function() {
// 	var resolve_url = http.request('http://api.soundcloud.com/resolve.json?url=' + track_url + '&client_id=' client_id);
// 	console.log(resolve_url);
// }


// http.createServer(function(request, response) {
// 	//var filePath = '../assets/afx.mp3';
// 	//
// 	//route mp3 file through to 127.0.0.1:2000/Clayhill
// 	var filePath = '../assets/Clayhill-Dub.mp3';
	
// 	//returns 403 forbidden but is an mp3 file
// 	//return too long from metadata json if the client request a track longer than 5mins 
// 	//var filePath = "http://ec-media.soundcloud.com/aJTfLYiG5JV8.128.mp3?ff61182e3c2ecefa438cd02102d0e385713f0c1faf3b0339595667fa0b0deb16b1751ab3b2d961347c48cd54ffa73a55be9513adc4916f55411c1d265571dad80242e93671&AWSAccessKeyId=AKIAJBHW5FB4ERKUQUOQ&Expires=1340480281&Signature=doArLvlZUX5%2BKUM1K2femzvqgzE%3D";
	

// //http://soundcloud.com/s_p_a_c_e_s/wireless

// 	//
// 	//http://api.soundcloud.com/tracks/49593184.json?client_id=86961c923d1a04425a46ac1a4a19c675
	
// 	//http.request(request_opts, function(response) {
	
// 	//console.log(request_opts);
// 	//console.log(response);
// 	// response.writeHead(200, {'Content-Type': 'text/plain'});
// 	// response.write('Hello World\n');
// 	// response.end();
// 	// });
// 	var stat = fileSystem.statSync(filePath);

// 	response.writeHead(200, {
// 		'Content-Type' : 'audio/mpeg',
// 		'Content-Length' : stat.size
// 	});

// 	var readStream = fileSystem.createReadStream(filePath);
// 	util.pump(readStream, response);
// }).listen(2000);
//console.log('MP3 server on port 2000');