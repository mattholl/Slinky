/**
 * //ripped from https://github.com/oampo/AmbientCloudsetTimeout(function() {}, 10);
 * 
 */

var Slinky  = function() {
	this.clientID = '86961c923d1a04425a46ac1a4a19c675';
	SC.initialize({
		client_id : this.clientID
	});

	this.player = new Player(this);
    this.beats = [];
};

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


