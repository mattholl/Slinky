/**
 * sets the responder objects and beats
 * should really put this into require callbacks
 */
//new Responder(y-position, )
var	beats = [],
	responders = [];

function createResponders () {
	//20Hz
	responders[0] = new Responder(0);

	beats[0] = dancer.createBeat({
		frequency : [0,1],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders[0].doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders[0].doScale = false;
		}
	});

	beats[0].on();

	//70Hz
	responders[1] = new Responder(20);

	beats[1] = dancer.createBeat({
		frequency : [1,2],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders[1].doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders[1].doScale = false;
		}
	});

	beats[1].on();

	//120Hz
	responders[2] = new Responder(40);

	beats[2] = dancer.createBeat({
		frequency : [2,3],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders[2].doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders[2].doScale = false;
		}
	});

	beats[2].on();

	//170Hz
	responders[3] = new Responder(60);

	beats[3] = dancer.createBeat({
		frequency : [3,4],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders[3].doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders[3].doScale = false;
		}
	});

	beats[3].on();

	//220Hz
	responders[4] = new Responder(80);

	beats[4] = dancer.createBeat({
		frequency : [4,5],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders[4].doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders[4].doScale = false;
		}
	});

	beats[4].on();

	//270Hz
	responders[5] = new Responder(1000);

	beats[5] = dancer.createBeat({
		frequency : [5,6],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders[5].doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders[5].doScale = false;
		}
	});

	beats[5].on();

	//320Hz
	
	responders[6] = new Responder(60);

	beats[6] = dancer.createBeat({
		frequency : [7,7],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders[6].doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders[6].doScale = false;
		}
	});

	beats[6].on();
	// responders[7] = new Responder(70);
	// responders[8] = new Responder(80);
	// responders[9] = new Responder(90);
	// responders[10] = new Responder(100);
	//might want to set threshold manually..	
}
