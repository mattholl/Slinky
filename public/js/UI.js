var UI = function(player, track) {
	this.player = player;
	this.track = track;

    this.playButton = document.getElementById('play');
    this.playButton.addEventListener('click', function(e) {
        app.player.dancer.play();
    });

    this.stopButton = document.getElementById('stop');
    this.stopButton.addEventListener('click', function(e) {
        app.player.dancer.stop();
    });
    
    $('#track-form').on('submit', function(e) {
    	var trackUrl = (this.elements['track-url'].value);

        player.getTrackFromURL(trackUrl);

        e.preventDefault();
    })

    // document.getElementById('track-form').addEventListener('submit', function(e) {
        
        
    // });
};

UI.prototype.updateInfo = function(track) {
	//get dom elements
	//variables should be in player.track
	//javascript is like weaving simultaneous actions and reactions together - creating a web
	//javascript apps - sitting between the server and the browser
	//console.log(player.track);
	console.log(track.title);
}