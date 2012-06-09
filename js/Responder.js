// create Responder object
	// create when beat on
	// draw function increase radius and fill black
	// when beat off (fnarr) fill with white - no need to construct shape cos it'll wipe out others
	// needs to detect if it's off screen and delete
	// 
//params 
function Responder() {
	//needs drawing functions
	//needs to know how deep
	//	difference between radii of two circles
	//
	//
	this.radius = 0;
	
}

Responder.prototype.update = function() {
	//as we tick through animate keep the circle growing outwards
	//it's depth based on how long between beat fireing and stopping
	//radius of first circle - increment in this function - stared when beat fires
	//radius of second cirlce - increment at same rate - started when stop beat fires
	//draw in between these
	//
	//check if we're still on the screen if not
	this.radius += 1;
}

Responder.prototype.render = function() {
	//use compoiting methods
	//https://developer.mozilla.org/en/Canvas_tutorial/Compositing
	console.log(this.radius)
}