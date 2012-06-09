//Globals
var canvas,
	ctx,
	dancer,
	responders = [],
	beats = [];


function setup() {
	//use dom emthods to attach the canvas to the page
	canvas = document.getElementById("dancer");
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    //call function to create the dancer object
    //create array of responders
    //tie responders to beats....

    dancer = new Dancer("http://webdev/canvas/2d/beat_ring_2d/assets//S_P_A_C_E_S_Apologies.ogg");
    dancer.playing = false;
    //each time beat fires we'll need a new responder....

	// frequency the frequency (element of the spectrum) to check for a spike. Can be a single frequency (number) or a range (2 element array) that uses the frequency with highest amplitude. Default: [ 0, 10 ]
	// threshold the minimum amplitude of the frequency range in order for a beat to occur. Default: 0.3
	// decay the rate that the previously registered beat's amplitude is reduced by on every frame. Default: 0.02
	// onBeat the callback to be called when a beat is detected.
	// offBeat the callback to be called when there is no beat on the current frame.

    beats[0] = dancer.createBeat({
		frequency : [2, 100],
		onBeat : function() {
			//create new responder give it params
			responders.push() = new Responder();
			//do something with this.responder
			// console.log();
			//return responder;
		},
		offBeat : function() {
			//set off on the responder...
			//no need to destry the responder detroys itself once offscreen after onBeat
			//and offBeat have given it its start and end points it doesn't need it any more
		}
	});

    console.log(beats);

    console.log(responders);

    beats[0].on();

    //set up array of frequencies to respond to with respective params
    //loop to create beats array 
    //loop to call on() on every beat
    //
    //need to keep a global array of responders to loop through in draw
    

    playButton();
    draw();
}


//http://creativejs.com/resources/requestanimationframe/
var fps = 15;
function draw() {

	window.addEventListener('resize', setup, false);

    setTimeout(function() {
        requestAnimationFrame(draw);
        //beats[0].responder.update();
		//beats[0].responder.render();
    }, 1000 / fps);
}

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