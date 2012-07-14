function Responder(yPos) {

	this.doScale = false;
	this.scaleVal = 0;

	/**
	 * create mesh and add to render
	 */
	//new THREE.CylinderGeometry(radiusTop, radiusBottom, segmentsRadius, segmentsHeight, openEnded)
	//this.geometry = new THREE.CylinderGeometry(100, 100, 10, 40, false );
	
	//circle geometry
	this.geometry = this.createCircle();

	//this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );	
	this.material = new THREE.LineBasicMaterial({color: 0x0000ff});

	//this.mesh = new THREE.Mesh( this.geometry, this.material );
	this.line = new THREE.Line(this.geometry, this.material);
	
	//this.y = ;
	this.line.position.y = 0 || yPos;
	
	//referencing the global app object need to decouple
	app.container.add(this.line);
}

Responder.prototype.createCircle = function() {
	var radius = 100,
		angleInc = 0.3,
		geometry = new THREE.Geometry();

	
	for(var angle = 0.0; angle < 2*Math.PI; angle += angleInc) {
		geometry.vertices.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
	}
	geometry.vertices.push(new THREE.Vector3(Math.cos(0.0) * radius, 0, Math.sin(0.0) * radius));
	return geometry;
};

Responder.prototype.update = function() {
	//scale constantly reducing on update - pass factor to scale scale by in to constructor - ie lower for lower freq
	if(this.doScale === true) {
		//set scaleVal once to greater than 
		this.incScale();
	}
	
	//do the mesh scaling
	//TODO scale z not workin
	this.line.scale.x = this.line.scale.x += this.scaleVal;
	this.line.scale.z = this.line.scale.z += this.scaleVal;

	this.dampScale();
};

Responder.prototype.incScale = function() {
	this.scaleVal = this.scaleVal += 1.5;
}

Responder.prototype.dampScale = function () {
	//return the scale values for the mesh to 1 - rate varies depending on frequency
	this.line.scale.x = this.line.scale.x += ( 1 - this.line.scale.x ) * 0.05;
	this.line.scale.z = this.line.scale.z += ( 1 - this.line.scale.z ) * 0.05;
	this.scaleVal = 0;
}





