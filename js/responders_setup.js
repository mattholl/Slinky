/**
 * sets the responder objects and beats
 * should really put this into require callbacks
 */
//new Responder(y-position, )
var	beats = {},
	responders = {};

function createResponders() {
	
	responders.twentyHz = new Responder(0);

	//20Hz
	beats.twentyHz = dancer.createBeat({
		frequency : [0,1],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders.twentyHz.doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders.twentyHz.doScale = false;
		}
	});

	beats.twentyHz.on();

	/*___________________________________*/
	
	responders.seventyHz = new Responder(10);

	//70Hz
	beats.seventyHz = dancer.createBeat({
		frequency : [1,2],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders.seventyHz.doScale = true;
			
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders.seventyHz.doScale = false;
		}
	});

	beats.seventyHz.on();

	/*___________________________________*/
	
	responders.oneTwenty = new Responder(20);

	//120Hz
	beats.oneTwenty = dancer.createBeat({
		frequency : [3,4],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders.oneTwenty.doScale = true;

		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders.oneTwenty.doScale = false;
		}
	});

	beats.oneTwenty.on();

	/*___________________________________*/
	
	responders.oneSeventy = new Responder(30);

	//170Hz
	beats.oneSeventy = dancer.createBeat({
		frequency : [4,5],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders.oneSeventy.doScale = true;

		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders.oneSeventy.doScale = false;
		}
	});

	beats.oneSeventy.on();

		/*___________________________________*/
	
	responders.twoTwenty = new Responder(40);

	//220Hz
	beats.twoTwenty = dancer.createBeat({
		frequency : [5,6],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders.twoTwenty.doScale = true;

		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders.twoTwenty.doScale = false;
		}
	});

	beats.twoTwenty.on();
}
