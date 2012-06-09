//Globals
var canvas,
	ctx;


function setup() {
	//use dom emthods to attach the canvas to the page
	canvas = document.getElementById("dancer");
	ctx = canvas.getContext('2d');

	canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    draw();
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