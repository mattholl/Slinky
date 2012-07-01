/**
 * //ripped from https://github.com/oampo/AmbientCloud
 * 
 */

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

	//this.audiolet = new Audiolet();
    //this.player = new WebKitBufferPlayer(this.audiolet, this.next.bind(this));
    //this.player = new WebKitBufferPlayer(this.audiolet);
    //this.delay = new FeedbackDelay(this.audiolet, 5, 0.9);
    //this.limiter = new Limiter(this.audiolet);
    //this.reverb = new Reverb(this.audiolet, 1, 0.9, 0.1);
    //this.player.connect(this.delay);
    //this.delay.connect(this.limiter);
    //this.limiter.connect(this.reverb);
    //this.player.connect(this.audiolet.output);
    //
    //
    //this.player = new SoundSource();

    //url is passed in line 106
    //this.player.load(url, this.onLoad.bind(this), this.onError.bind(this));
    //should just load the url - same code on my SoundSource.js
    //so calling play again will rebiuild the dancer beat and objects
    //will need to rewrite how I interface with the player - instance of dancer becomes app.player?
    //app.player.play(), app.player.stop()
    //need to pass the call back events through to dancer...
    //
    //this.player = new Dancer();
    


    //set up form handling
    
    this.trackForm = document.getElementById('track-form');
    this.trackForm.addEventListener('submit', function(e) {
		var trackUrl = (this.elements['track-url'].value);

		//if not http add it?
		app.player.getTrackFromURL(trackUrl);
        //app.player.load();
		
		// app.player.dancer.createBeat({
		// 	frequency : [2,4],
		// 	theshold : 0.8,
		// 	onBeat : function() {
		// 		console.log('beat on');
		// 	},
		// 	offBeat : function() {
		// 		console.log('beat off');
		// 	}
		// });
		
		e.preventDefault();
    })

    //app.player.load() //takes this.track - pass it in to be sure - this.track created in getTRackFromURL
    //  create the dancer object
    //app.player.dancer.play();
    
    // this.trackForm.onsubmit(function() {
    // 	//this.getNewTrack.bind(this));
  		// console.log(this.trackForm);  
    // });

    	
};


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
    }.bind(this)); //binds Player to the value of this within the SC.get call
};


Player.prototype.addTrack = function(track) {
	this.track = new Track(this.app, track);
    //need to call laod once track is created
    //need to listen to dancer to laded event
}



Player.prototype.load = function(track) {
    if (this.track.track.stream_url) {
        // Load the track from our Node.js proxy, rather than straight from
        // SoundCloud because of
        // http://code.google.com/p/chromium/issues/detail?id=96136
        var url = '/proxy?url=' + this.track.track.stream_url;
        this.dancer = new Dancer(url);
        //this.player.load(url, this.onLoad.bind(this), this.onError.bind(this));
        

        this.dancer.bind('loaded', function() {
            console.log('laoded');
        });


        this.loading = true;

    }
    else {
        // Track is not streamable, so just skip to the next one
        //this.next();
    }
};


Player.prototype.onLoad = function() {
    //need on load to fire and call //app.player.load(this.track);
    //in here - ensures that the dancer object is available
    //this.app.trackView.unsetLoading();
    this.loading = false;
    //console.log(this.loading);
};

Player.prototype.onError = function() {
    //console.log('error');
};






window.onload = function() {
	window.app = new SoundcloudClient();
	//console.log(window.app);

	//bind to submit
	//app.player.getTrackFromURL('http://soundcloud.com/rob_booth/milanese-espantoso-freebie');
	//app.player.getTrackFromURL('http://soundcloud.com/s_p_a_c_e_s/wireless');
	
}

