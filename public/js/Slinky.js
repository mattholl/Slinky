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
    this.responders = [];
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


Slinky.prototype.createLowResponders = function() {
    //roughly 0 - 2000Hz
    var startY = -300,
        yInc = 0;
        freqLow = 0,
        freqHigh = 2;


    for(var i = 0; i < 15; i++) {

        (function(i) {
            
            responders[i] = new Responder(startY + yInc*10);

            beats[i] = dancer.createBeat({
                frequency : [freqLow, freqHigh],
                threshold : 0.08,
                onBeat : function() {
                    //start increasing the scale transform on the Responder object for this beat frequency
                    responders[i].doScale = true;
                },
                offBeat : function() {
                    //stop increasing scale, allow damping to take effect
                    responders[i].doScale = false;
                }
            });

            beats[i].on();

        }(i));
        
        freqLow += 3;
        freqHigh += 3;
        yInc += 1;
    }
};


Slinky.prototype.createMidResponders = function() {
    //to centre to column around zero and allow setting freq bins other than incremnting with i
    var startY = -170,
        yInc = 0;
        freqLow = 45,
        freqHigh = 48;


    for(var i = 15; i < 30; i++) {

        (function(i) {
            
            responders[i] = new Responder(startY + yInc*10);

            beats[i] = dancer.createBeat({
                frequency : [freqLow, freqHigh],
                threshold : 0.015,
                onBeat : function() {
                    //start increasing the scale transform on the Responder object for this beat frequency
                    responders[i].doScale = true;
                    
                },
                offBeat : function() {
                    //stop increasing scale, allow damping to take effect
                    responders[i].doScale = false;
                }
            });

            beats[i].on();

        }(i));
        
        freqLow += 5;
        freqHigh += 5;
        yInc += 1;
    }
};

Slinky.prototype.createHighResponders = function() {
    //to centre to column around zero and allow setting freq bins other than incremnting with i
    var startY = -20,
        yInc = 0;
        freqLow = 120,
        freqHigh = 122;

    for(var i = 30; i < 45; i++) {

        (function(i) {
            
            responders[i] = new Responder(startY + yInc*10);

            beats[i] = dancer.createBeat({
                frequency : [freqLow, freqHigh],
                threshold : 0.009,
                onBeat : function() {
                    //start increasing the scale transform on the Responder object for this beat frequency
                    responders[i].doScale = true;
                    
                },
                offBeat : function() {
                    //stop increasing scale, allow damping to take effect
                    responders[i].doScale = false;
                }
            });

            beats[i].on();

        }(i));
        
        freqLow += 3;
        freqHigh += 3;
        yInc += 1;
    }
};


window.onload = function() {
    window.app = new Slinky();
    //bind to submit
    //app.player.getTrackFromURL('http://soundcloud.com/rob_booth/milanese-espantoso-freebie');
    //app.player.getTrackFromURL('http://soundcloud.com/s_p_a_c_e_s/wireless');
    
};
