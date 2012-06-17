/**
 * sets the responder objects and beats
 * should really put this into require callbacks
 */

var	beats = {},
	responders = {};

function createResponders() {
	
	responders.clap = new Responder(0);

	//intro clap 209Hz
	beats.clap = dancer.createBeat({
		frequency : [4,5],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders.clap.doScale = true;
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders.clap.doScale = false;
		}
	});

	beats.clap.on();

	/*___________________________________*/
	//new Responder(y-position, )
	responders.bass = new Responder(10);

	//intro clap 209Hz
	beats.bass = dancer.createBeat({
		frequency : [3,4],
		threshold : 0.1,
		onBeat : function() {
			//start increasing the scale transform on the Responder object for this beat frequency
			responders.bass.doScale = true;
		},
		offBeat : function() {
			//stop increasing scale, allow damping to take effect
			responders.bass.doScale = false;
		}
	});

	beats.bass.on();	
}
