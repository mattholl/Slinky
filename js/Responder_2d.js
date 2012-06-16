// create Responder object
	// create when beat on
	// draw function increase radius and fill black
	// when beat off (fnarr) fill with white - no need to construct shape cos it'll wipe out others
	// needs to detect if it's off screen and delete
	// 
	// colour is proportional to frequency
	// rate of movement is proportional to frequency
//params 
function Responder(radiusIncrement, freq, birth, centre, colour) {
	//needs drawing functions
	//needs to know how deep
	//	difference between radii of two circles
	//
	//
	this.outerRadius = 0;
	this.innerRadius = 0;
	this.frequency = freq;
	this.radInc = radiusIncrement;
	this.onBeatT = birth;
	this.offBeatT = 0;
	this.innerRadSet = false;
	this.centre = centre;
	this.colour = colour;
}

Responder.prototype.update = function() {
	//as we tick through animate keep the circle growing outwards
	//it's depth based on how long between beat fireing and stopping
	//radius of first circle - increment in this function - stared when beat fires
	//radius of second cirlce - increment at same rate - started when stop beat fires
	//draw in between these
	//
	//check if we're still on the screen if not
	//
	//the rate that the radius increases is proportional to the frequency
	//also correlate to shade
	this.outerRadius += this.radInc;

	//var elapsed = this.onBeatT - this.offBeatT;
	//gets called every time - only first time needed to set innerRadius
	if(this.innerRadSet === true) {
		this.innerRadius += this.radInc;
	}

	if(this.offBeatT > 0) {
		//this.innerRadius = this.offBeatT - this.onBeatT;
		this.innerRadSet = true;
	}
}

Responder.prototype.display = function() {
	//use compoiting methods
	//https://developer.mozilla.org/en/Canvas_tutorial/Compositing
	//console.log(this.outerRadius - this.innerRadius);
	//
	ctx.save();

	ctx.beginPath();
	ctx.arc(this.centre.x, this.centre.y, this.outerRadius, 0, 2*Math.PI);
	ctx.fillStyle = this.colour;
	ctx.fill();

	ctx.globalCompositeOperation = 'destination-out';

	ctx.beginPath();
	ctx.arc(this.centre.x, this.centre.y, this.innerRadius, 0, 2*Math.PI);
	//ctx.fillStyle = '#b64400';
	ctx.fill();

	ctx.restore();
	
}