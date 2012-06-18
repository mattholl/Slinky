/**
 * sets the responder objects and beats
 * should really put this into require callbacks
 */
//new Responder(y-position, )

function createLowResponders() {
	//roughly 0 - 2000Hz
    var startY = -300,
		yInc = 0;
		freqLow = 0,
		freqHigh = 1;


    for(var i = 0; i < 20; i++) {

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

		})(i)
		
		freqLow += 2;
		freqHigh += 2;
		yInc += 1;
	}
}


function createMidResponders() {
	//to centre to column around zero and allow setting freq bins other than incremnting with i
    var startY = -100,
		yInc = 0;
		freqLow = 42,
		freqHigh = 44;


    for(var i = 20; i < 40; i++) {

		(function(i) {
			
			responders[i] = new Responder(startY + yInc*10);

			beats[i] = dancer.createBeat({
				frequency : [freqLow, freqHigh],
				threshold : 0.05,
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

		})(i)
		
		freqLow += 3;
		freqHigh += 3;
		yInc += 1;
	}
}

function createHighResponders() {
		//to centre to column around zero and allow setting freq bins other than incremnting with i
    var startY = 90,
    	yInc = 0;
		freqLow = 102,
		freqHigh = 103;

    for(var i = 40; i < 80; i++) {

		(function(i) {
			
			responders[i] = new Responder(startY + yInc*10);

			beats[i] = dancer.createBeat({
				frequency : [freqLow, freqHigh],
				threshold : 0.05,
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

		})(i)
		
		freqLow += 2;
		freqHigh += 2;
		yInc += 1;
	}
}
 