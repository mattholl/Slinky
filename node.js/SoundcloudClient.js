//soundcloud client is dealing with the form input

var SoundcloudClient  = function() {
	this.clientID = '86961c923d1a04425a46ac1a4a19c675';
	SC.initialize({
		client_id : this.clientID,
	});

	this.player = new Player(this);
}




//call player.play on submit - or when loaded
/**
 * Attempt to load a track and play it.  Updates the track view with loading
 * and playing indicators.
 */

var Player = function(app) {
	this.app = app;
	this.track = null;
	this.loading = false;

	this.audiolet = new Audiolet();
    //this.player = new WebKitBufferPlayer(this.audiolet, this.next.bind(this));
    this.player = new WebKitBufferPlayer(this.audiolet);
}


/**
 * Adds a track to the playlist after retreiving the data info from SoundCloud.
 * Asynchronous.
 */
Player.prototype.getTrackFromURL = function(url, position) {
    SC.get('/resolve', {url: url}, function(track, error) {
        if (error) {
            console.error(error.message);
            return;
        }

        if (position != null) {
            this.setTrack(track, position);
        }
        else {
            this.addTrack(track);
        }
    }.bind(this));
    //calls SC.get and puts what it returns into the track object on player
    //track object contains all info
    //this = player
};

Player.prototype.addTrack = function(track) {
	this.track = new Track(this.app, track);
}



Player.prototype.play = function(track) {
    if (this.track.track.stream_url) {
        // Load the track from our Node.js proxy, rather than straight from
        // SoundCloud because of
        // http://code.google.com/p/chromium/issues/detail?id=96136
        var url = '/proxy?url=' + this.track.track.stream_url;

        

        //called in SC? - WebKitBufferPlayer - will need to integrate with dancer here?
        this.player.load(url, this.onLoad.bind(this), this.onError.bind(this));

        //console.log('track');
        //this.track = track;
        //this.playlist = this.app.currentPlaylist;
        this.loading = true;



        // Update the track view
        //this.app.trackView.setNowPlaying();
        //this.app.trackView.setLoading();
    }
    else {
        // Track is not streamable, so just skip to the next one
        //this.next();
    }
};


/**
 * Called when we submit the "Add Track" form.  Tries to get the track data
 * from SoundCloud, and adds it to the playlist.
 */
// TrackView.prototype.onNewTrackSubmit = function() {
//     this.app.currentPlaylist.addTrackFromURL($('#new-track input').val());
//     this.hideTrackInput();
//     return false;
// };

Player.prototype.onLoad = function() {
    //this.app.trackView.unsetLoading();
    this.loading = false;
    console.log(this.loading);
};

Player.prototype.onError = function() {
    //console.log('error');
};


window.onload = function() {
	window.app = new SoundcloudClient();
	//console.log(window.app);

	//bind to submit
	//app.player.getTrackFromURL('http://soundcloud.com/rob_booth/milanese-espantoso-freebie');
	app.player.getTrackFromURL('http://soundcloud.com/s_p_a_c_e_s/wireless');
	
}

