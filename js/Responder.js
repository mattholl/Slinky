function Responder() {

	this.scale = false;
	this.scaleVal = 0;
	

	/**
	 * create mesh and add to render
	 */
	//new THREE.CylinderGeometry(radiusTop, radiusBottom, segmentsRadius, segmentsHeight, openEnded)
	this.geometry = new THREE.CylinderGeometry(100, 100, 10, 40, false );
	this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );	

	this.mesh = new THREE.Mesh( this.geometry, this.material );

	container.add(this.mesh);


	//needs
	//to create mesh / geometry etc.
	//func to update scaling - whilst beat is on
	//func to do scale back over time
	//
}

Responder.prototype.update = function() {
	
	//scale constantly reducing on update - pass factor to scale scale by in to constructor - ie lower for lower freq
	if(this.scale) {
		this.incScale();
	}
	this.dampScale();
	//do the mesh scaling
	this.mesh.scale.x = this.mesh.scale.x += this.scale;
	this.mesh.scale.z = this.mesh.scale.z += this.scale;

}

Responder.prototype.incScale = function() {
	
	this.scaleVal += 0.1;
	
}

Responder.prototype.dampScale = function () {
	this.scaleVal = this.scaleVal *= 0.5;
}





