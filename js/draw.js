//Globals
var canvas,
	ctx,
	dancer,
	responders = {},
	beats = [];



// var resp = new Responder(6);
//     console.log(resp);

//     resp.update();
// 	console.log(resp);

function setup() {
	//use dom emthods to attach the canvas to the page
	canvas = document.getElementById("dancer");
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    var centre = {
    	x : window.innerWidth/2,
    	y : window.innerHeight/2
    }

    //call function to create the dancer object
    //create array of responders
    //tie responders to beats....

    dancer = new Dancer("http://webdev/canvas/2d/beat_ring_2d/assets//S_P_A_C_E_S_Apologies.ogg");
    dancer.playing = false;

    dancer.responders();
    //each time beat fires we'll need a new responder....

	// frequency the frequency (element of the spectrum) to check for a spike. Can be a single frequency (number) or a range (2 element array) that uses the frequency with highest amplitude. Default: [ 0, 10 ]
	//	12kHz - 20,000 kHz = human hearing range
	// threshold the minimum amplitude of the frequency range in order for a beat to occur. Default: 0.3
	// decay the rate that the previously registered beat's amplitude is reduced by on every frame. Default: 0.02
	// onBeat the callback to be called when a beat is detected.
	// offBeat the callback to be called when there is no beat on the current frame.

	responders.clapBeat = [];

	//intro clap 209Hz
    beats[0] = dancer.createBeat({
		frequency : [4,5],
		threshold : 0.1,
		onBeat : function() {
			//create new responder give it params (frequency, time canvas centre)
			var responder = new Responder(10, [4,5], Date.now(), centre, '#d4b3c2');
			responders.clapBeat.push(responder);
			//console.log(responder);
			//console.log('clap');
			
		},
		offBeat : function() {
			//how do we access the same responder!?!?!!?
			//pub/sub pattern to update same responder

			for (var i = responders.clapBeat.length - 1; i >= 0; i--) {
				if(responders.clapBeat[i].offBeatT === 0) {
					responders.clapBeat[i].offBeatT = Date.now();
				}
			};
			
		}
	});
	
	//longer bass tone?
	responders.bass = [];

    //
    //responders.push(new Responder([0,2]));


    beats[1] = dancer.createBeat({
    	//main bass kick?
		frequency : [0,2], //1.7 50Hz
		threshold : 0.4,

		onBeat : function() {
			var responder = new Responder(2, [0,2], Date.now(), centre, '#000000');
			responders.bass.push(responder);
			//console.log('bass');
		},
		offBeat : function() {
			for (var i = responders.bass.length - 1; i >= 0; i--) {
				if(responders.bass[i].offBeatT === 0) {
					responders.bass[i].offBeatT = Date.now();
				}
			};
		}
	});


  //   responders.high = [];
    
  //   beats[2] = dancer.createBeat({
  //   	frequency : [10,20],
  //   	threshold : 0.3,

  //   	onBeat : function() {
		// 	var responder = new Responder([0,2], Date.now(), centre);
		// 	responders.high.push(responder);
		// 	//console.log('bass');
		// },
		// offBeat : function() {
		// 	for (var i = responders.high.length - 1; i >= 0; i--) {
		// 		if(responders.high[i].offBeatT === 0) {
		// 			responders.high[i].offBeatT = Date.now();
		// 		}
		// 	};
		// }
  //   });

    beats[0].on();
    beats[1].on();
//    beats[2].on();

    //console.log(responders);
    //set up array of frequencies to respond to with respective params
    //loop to create beats array 
    //loop to call on() on every beat
    //
    //need to keep a global array of responders to loop through in draw
    

    playButton();
    //draw();
}

Dancer.addPlugin( 'responders', function() {

	this.bind( 'update', function() {
	    
	    //update and display
	    if(responders.clapBeat.length !== 0) {
	    	for (var i =  0; i < responders.clapBeat.length; i++) {
	    		responders.clapBeat[i].update();
	    		responders.clapBeat[i].display();
	    	};
	    }

	    if(responders.bass.length !== 0) {
        	for (var i =  0; i < responders.bass.length; i++) {
        		responders.bass[i].update();
        		responders.bass[i].display();
        	};
        }

        // if(responders.high.length !== 0) {
        // 	for (var i =  0; i < responders.high.length; i++) {
        // 		responders.high[i].update();
        // 		responders.high[i].display();
        // 	};
        // }

        //remove 
        if(responders.clapBeat.length !== 0) {
	        for (var i = responders.clapBeat.length-1; i >= 0; i--) {
	    		if (responders.clapBeat[i].innerRadius > canvas.width) {
	        		responders.clapBeat.splice(i, 1);
	    		}
	    	}
    	}

    	if(responders.bass.length !== 0) {
			for (var i = responders.bass.length-1; i >= 0; i--) {
	    		if (responders.bass[i].innerRadius > canvas.width) {
	        		responders.bass.splice(i, 1);
	    		}
	    	} 
    	}


	});


});

window.onload = setup;

//*
//
//_____ other funcs
function playButton() {
	   //add play/pause button
    //play / pause button
	var playButton = document.createElement("button");
	var value = document.createTextNode("play/pause");
	playButton.appendChild(value);
	
	playButton.style.position = 'absolute';
	playButton.style.top = '0px';
	playButton.style.left = '0px';

	playButton.onclick = function(e) {
		if(dancer.playing) {
			dancer.stop();
			dancer.playing = false;
			return false;
		}

		if(!dancer.playing) {
			dancer.play();
			dancer.playing = true;
			return false;
		}
	}

	document.body.appendChild(playButton);
}