/**
 * from https://github.com/oampo/AmbientCloudsetTimeout
 * init the connection to the soundcloud api 
 * create the player and provide the function to create beats on various threshold
 * will need to pass the variables into each create beat from UI
 * so call this on change - will need to rebuild the Responder objects but reload the player and dancer objects..?
 * this is the root of the app - all functions, variables should be in here rather than stored globally
 */

var Slinky  = function() {
	this.clientID = '86961c923d1a04425a46ac1a4a19c675';
	SC.initialize({
		client_id : this.clientID
	});

	this.player = new Player(this);
    this.beats = [];
};

//called from the onLoad function in Player
//TODO: make sure that the UI doesn't allow playing until all is loaded
Slinky.prototype.createBeat = function() {
    console.log('create beat');
    this.beats[0] = this.player.dancer.createBeat({
        frequency : [2,4],
        theshold : 0.1,
        onBeat : function() {
            console.log('beat on');
        },
        offBeat : function() {
            //console.log('beat off');
        }
    });
    this.beats[0].on();
};


window.onload = function() {
    window.app = new Slinky();
    //bind to submit
    //app.player.getTrackFromURL('http://soundcloud.com/rob_booth/milanese-espantoso-freebie');
    //app.player.getTrackFromURL('http://soundcloud.com/s_p_a_c_e_s/wireless');
    
};
