//Globals
var canvas,
	ctx,
	dancer;


function setup() {
	//use dom emthods to attach the canvas to the page
	canvas = document.getElementById("dancer");
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

	dancer = new Dancer("http://webdev/canvas/2d/beat_ring_2d/assets//S_P_A_C_E_S_Apologies.ogg");
	//dancer = new Dancer("http://webdev/canvas/2d/beat_ring_2d/assets/15670Hz.ogg");
	dancer.fft(canvas, 2, 1);

	dancer.playing = false;

    playButton();
    //dumpSpectrumData();

    //draw();
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


// function dumpSpectrumData() {
// 	var spectrumDump = document.createElement("button");
// 	var value = document.createTextNode("dump spectrum");
// 	spectrumDump.appendChild(value);

// 	spectrumDump.style.position = "absolute";
// 	spectrumDump.style.top = "0px";
// 	spectrumDump.style.left = "100px";

// 	spectrumDump.onclick = function() {
// 		console.log(dancer.getSpectrum());
// 		return false;		
// 	}

// 	document.body.appendChild(spectrumDump);
// }




	
	//http://creativejs.com/resources/requestanimationframe/
// var fps = 15;
// function draw() {

// 	window.addEventListener('resize', setup, false);

// 	ctx.clearRect(0, 0, canvas.width, canvas.height);

//     setTimeout(function() {
//         requestAnimationFrame(draw);
        



//     }, 1000 / fps);
// }

window.onload = setup;