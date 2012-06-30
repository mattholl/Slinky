
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


    // this.xhr.onload = function() {
    	
    // 	var audioData = this.response;
    // 	console.log(audioData);
    // }
    this.xhr.onerror = onError;
    this.xhr.send();
}


SoundSource.prototype.onLoad = function(onLoad, onError) {
    //console.log(this.xhr.response);
    var audioData = this.xhr.response;
	this.audioGraph(audioData);



    // Load the buffer into memory for decoding
//    this.fileBuffer = this.context.createBuffer(this.xhr.response, false);

    // this.context.decodeAudioData(this.xhr.response, function(buffer) {
    //     this.onDecode(buffer);
    //     onLoad();
    // }.bind(this), onError);
};

SoundSource.prototype.onError = function(e) {
	console.log('error: ' + e);
};

SoundSource.prototype.audioGraph = function(audioData) {
	console.log(this.context);
	this.soundSource = this.context.createBufferSource();
	
	this.soundBuffer = this.context.createBuffer(audioData, true/*mono*/);

	this.soundSource.buffer = this.soundBuffer;

	this.soundSource.connect(this.context.destination);
	//playSound(soundSource);
	//
	this.soundSource.noteOn(this.context.currentTime);
}