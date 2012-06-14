var cylinder,
	material,
	mesh;

function setup() {
	cylinder = new THREE.CylinderGeometry(100, 100, 20, 20, 20, false );

	material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );	

	mesh = new THREE.Mesh( cylinder, material );
	
	scene.add( mesh );
	
	console.log(cylinder);

	mesh.rotation.x = mesh.rotation.x += Math.PI/2;

	draw();
}


fps = 30;
var draw = function() {
	setTimeout(function() {
		requestAnimationFrame(draw);
		
		window.addEventListener('resize', setup, false);

		//mesh.rotation.y = mesh.rotation.y += ( targetRotation - mesh.rotation.y ) * 0.05;
		
		mesh.scale.x = mesh.scale.x += 0.5;
		mesh.scale.z = mesh.scale.z += 0.5;
	//	mesh.scale.y = mesh.scale.y -= 0.1;

		renderer.render( scene, camera );

	}, 1000/fps);
}

window.onload = setup;

