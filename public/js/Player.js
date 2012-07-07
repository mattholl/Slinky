/**
 * https://github.com/oampo/AmbientCloud
 * Player connects to the
 *
 */

var Player = function(app) {
    this.app = app;
    this.track = null;
    this.loading = false;

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

    //User interface
    this.UI = new UI(this, this.track);
};


/**
 * Adds a track to the playlist after retreiving the data info from SoundCloud.
 * Asynchronous.
 */
Player.prototype.getTrackFromURL = function(url, position) {
    SC.get('/resolve', {url: url}, function(track, error) {
        //look at track and chck size etc.

        if (error) {
            console.error(error.message);
            return;
        }

        // if (position !== null) {
        //     this.setTrack(track, position);
        // }
        else {
            this.track = track;
            this.UI.updateInfo(this.track);
            this.load(this.track); //this = player
        }
    }.bind(this)); //binds Player to the value of this within the SC.get call
};

Player.prototype.load = function(track) {
    
    if (track.stream_url) {
        // Load the track from our Node.js proxy, rather than straight from
        // SoundCloud because of
        // http://code.google.com/p/chromium/issues/detail?id=96136
        var url = '/proxy?url=' + this.track.stream_url;
        this.dancer = new Dancer(url);
        //this.player.load(url, this.onLoad.bind(this), this.onError.bind(this));
        this.loading = true;

        this.dancer.bind('loaded', function() {
            
            console.log('laoded');
            app.player.onLoad();//too tightly coupled to app structure??
            //console.log(this); = Dancer
            //
           
            
        });

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
    //pub / sub to subscribe creating dancer beats to player.onLoad firing
    console.log('player.onload fired');
    
    console.log(this.app);
    app.createLowResponders();
    app.createMidResponders();
    app.createHighResponders();
    
    //
    //this.dancer.bind('playing', function() {
    //    console.log('playing?');
    //});
    this.dancer.render();
    
};

Player.prototype.onError = function() {
    //console.log('error');
};



