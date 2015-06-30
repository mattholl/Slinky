/**
 * deals with the requests to node and posts back to UI
 *
 */

var Player = function(app) {
    this.app = app;
    this.track = null;
    this.loading = false;
    this.UI = new UI(this, this.track, this.app);

    this._this = this;
};

Player.prototype.getTrackFromURL = function(url, position) {
    SC.get('/resolve', {url: url}, function(track, error) {

        //TODO: look at track and chck size etc.
        if (error) {
            //track info not found
            this.UI.trackWarning();
            return;
        } else {
            this.track = track;
            this.UI.updateInfo(this.track);
            this.load(this.track, this); //this = player
        }
    }.bind(this)); //binds Player to the value of this within the SC.get call
};

Player.prototype.load = function(track, player) {

    if (track.stream_url) {
        // https://github.com/oampo/AmbientCloud
        // Load the track from our Node.js proxy, rather than straight from
        // SoundCloud because of
        // http://code.google.com/p/chromium/issues/detail?id=96136
        var url = '/proxy?url=' + this.track.stream_url;

        this.dancer = new Dancer();
        var a = new Audio();
        a.src = url;
        this.dancer.load(a);

        this.loading = true;
        this.UI.loadingIndicator();
        this.dancer.bind('loaded', function(player) {
            //when the dancer is ready
            app.player.onLoad();
        });
    }
    else {
        //there's no stream url
        this.UI.trackWarning();
    }
};


Player.prototype.onLoad = function() {
    //need on load to fire and call //app.player.load(this.track);
    //in here - ensures that the dancer object is available
    this.loading = false;

    //remove remderer and create a new one if the app was already playing
    if(app.rendererSetup === true) {
        app.removeRenderer();
    }

    app.init();

    app.createLowResponders();
    app.createMidResponders();
    app.createHighResponders();

    //fire the plugin set up in slinky
    this.dancer.ready();

    //all ok so allow play
    this.UI.playReady();
};