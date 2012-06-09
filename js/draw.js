//Globals
var canvas,
	ctx;


function setup() {
	//use dom emthods to attach the canvas to the page
	canvas = document.getElementById("dancer");
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    playButton();

    draw();
}



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


	
	//http://creativejs.com/resources/requestanimationframe/
var fps = 15;
function draw() {

	window.addEventListener('resize', setup, false);


    setTimeout(function() {
        requestAnimationFrame(draw);
        // Drawing code goes here
    }, 1000 / fps);
}

window.onload = setup;