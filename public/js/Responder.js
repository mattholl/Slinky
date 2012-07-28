/**
 * creates and controls the individual blue circles
 */
function Responder(yPos) {

    this.doScale = false;
    this.scaleVal = 0;

    //create mesh and add to render
    //circle geometry
    this.geometry = this.createCircle();
    this.material = new THREE.LineBasicMaterial({color: 0x0000ff});
    this.line = new THREE.Line(this.geometry, this.material);
    this.line.position.y = 0 || yPos;
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
        this.incScale();
    }
    
    //do the mesh scaling
    this.line.scale.x = this.line.scale.x += this.scaleVal;
    this.line.scale.z = this.line.scale.z += this.scaleVal;

    this.dampScale();
};

Responder.prototype.incScale = function() {
    this.scaleVal = this.scaleVal += 1.5;
};

Responder.prototype.dampScale = function () {
    //update the scale values for the mesh to 1 - rate varies depending on frequency
    this.line.scale.x = this.line.scale.x += ( 1 - this.line.scale.x ) * 0.05;
    this.line.scale.z = this.line.scale.z += ( 1 - this.line.scale.z ) * 0.05;
    this.scaleVal = 0;
};
