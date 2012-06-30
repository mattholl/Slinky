//http://creativejs.com/resources/web-audio-api-getting-started/
var SoundSource = function() {
	this.context = new webkitAudioContext();
	this.sondBuffer = null;
	this.soundSource = null;
}

SoundSource.prototype.load = function(url, onLoad, onError) {
	this.xhr = new XMLHttpRequest();
    this.xhr.open("GET", url, true);
    this.xhr.responseType = "arraybuffer";
    this.xhr.onload = this.onLoad.bind(this, onLoad, onError);
    this.xhr.onerror = onError;
    this.xhr.send();
}


SoundSource.prototype.onLoad = function(onLoad, onError) {
    var audioData = this.xhr.response;
	this.audioGraph(audioData);


	// this.context.decodeAudioData(this.xhr.response, function(buffer) {
 //        this.onDecode(buffer);
 //        onLoad();
 //    }.bind(this), onError);
};

SoundSource.prototype.onError = function(e) {
	console.log('error: ' + e);
};

SoundSource.prototype.audioGraph = function(audioData) {
	this.soundSource = this.context.createBufferSource();
	this.soundBuffer = this.context.createBuffer(audioData, true/*mono*/);
	this.soundSource.buffer = this.soundBuffer;
	this.soundSource.connect(this.context.destination);
	this.soundSource.noteOn(this.context.currentTime);
}