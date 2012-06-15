var cylinder,
	material,
	mesh;

function setup() {
	cylinder = new THREE.CylinderGeometry(100, 100, 40, 40, 20, false );

	material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );	

	mesh = new THREE.Mesh( cylinder, material );
	
	scene.add( mesh );

	mesh.rotation.x = mesh.rotation.x += Math.PI/2;

	console.log(cylinder);
	draw();

	//
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
}

function render() {
	//resize the cylinder, add more segments
	// cylinder = new THREE.CylinderGeometry(100, 100, 20, 20, 20, false );

	// material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );	

	// mesh = new THREE.Mesh( cylinder, material );
	
	// scene.add( mesh );
	
	//scene.add( mesh );
}



fps = 12;
var draw = function() {
	setTimeout(function() {
		requestAnimationFrame(draw);
		
		

		//mesh.rotation.y = mesh.rotation.y += ( targetRotation - mesh.rotation.y ) * 0.05;
		mesh.rotation.x = mesh.rotation.x += ( targetRotation - mesh.rotation.x ) * 0.05;
		mesh.scale.x = mesh.scale.x += 0.005;
		mesh.scale.z = mesh.scale.z += 0.005;
	  	//mesh.scale.y = mesh.scale.y -= 0.04;

	  	render();
		

		renderer.render( scene, camera );

	}, 1000/fps);
}

window.addEventListener('resize', setup, false);
window.onload = setup;



function onDocumentMouseDown( event ) {
		event.preventDefault();

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mouseout', onDocumentMouseOut, false );

		mouseYOnMouseDown = event.clientY - windowHalfY;
		targetRotationOnMouseDown = targetRotation;
	}

	function onDocumentMouseMove( event ) {
		mouseY = event.clientY - windowHalfY;
		targetRotation = targetRotationOnMouseDown + ( mouseY - mouseYOnMouseDown ) * 0.05;
	}

	function onDocumentMouseUp( event ) {

		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	}

	function onDocumentMouseOut( event ) {

		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
		document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
	}

