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

	//
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	//document.addEventListener( 'touchstart', onDocumentTouchStart, false );
	//document.addEventListener( 'touchmove', onDocumentTouchMove, false );
}


fps = 30;
var draw = function() {
	setTimeout(function() {
		requestAnimationFrame(draw);
		
		

		//mesh.rotation.y = mesh.rotation.y += ( targetRotation - mesh.rotation.y ) * 0.05;
		mesh.rotation.x = mesh.rotation.x += ( targetRotation - mesh.rotation.x ) * 0.05;
		//mesh.scale.x = mesh.scale.x += 0.5;
		//mesh.scale.z = mesh.scale.z += 0.5;
	//	mesh.scale.y = mesh.scale.y -= 0.1;

		window.addEventListener('resize', setup, false);

		renderer.render( scene, camera );

	}, 1000/fps);
}

window.onload = setup;

function onDocumentMouseDown( event ) {
console.log(event);
		event.preventDefault();

		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
		document.addEventListener( 'mouseout', onDocumentMouseOut, false );

		mouseXOnMouseDown = event.clientX - windowHalfX;
		targetRotationOnMouseDown = targetRotation;
	}

	function onDocumentMouseMove( event ) {
		mouseX = event.clientX - windowHalfX;
		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;
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

