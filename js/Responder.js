function Responder() {

	this.doScale = false;
	this.scaleVal = 0;

	/**
	 * create mesh and add to render
	 */
	//new THREE.CylinderGeometry(radiusTop, radiusBottom, segmentsRadius, segmentsHeight, openEnded)
	this.geometry = new THREE.CylinderGeometry(100, 100, 10, 40, false );
	this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );	

	this.mesh = new THREE.Mesh( this.geometry, this.material );
	container.add(this.mesh);
}

Responder.prototype.update = function() {
	
	//scale constantly reducing on update - pass factor to scale scale by in to constructor - ie lower for lower freq
	if(this.doScale === true) {
		//set scaleVal once to greater than 
		this.incScale();
	}
	
	//do the mesh scaling
	this.mesh.scale.x = this.mesh.scale.x += this.scaleVal;
	this.mesh.scale.z = this.mesh.scale.z += this.scaleVal;

	this.dampScale();
}

Responder.prototype.incScale = function() {
	this.scaleVal = this.scaleVal += 1.5;
}

Responder.prototype.dampScale = function () {
	//return the scale values for the mesh to 1 - rate varies depending on frequency
	this.mesh.scale.x = this.mesh.scale.x += ( 1 - this.mesh.scale.x ) * 0.05;
	this.mesh.scale.z = this.mesh.scale.z += ( 1 - this.mesh.scale.z ) * 0.05;
	this.scaleVal = 0;
}





