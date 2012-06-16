var cylinder,
	material,
	mesh,
	mesh2,
	dummy;

function setup() {
	//new THREE.CylinderGeometry(radiusTop, radiusBottom, segmentsRadius, segmentsHeight, openEnded)
	cylinder = new THREE.CylinderGeometry(100, 50, 40, 40, 20, false );
	//cylinder.position = new THREE.Vector3(0, 0, 0);

	cylinder2 = new THREE.CylinderGeometry(50, 50, 40, 40, 20, false );
	//cylinder2.translateX(200);// = new THREE.Vector3(500, 10, 0);


	material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );	
	mesh = new THREE.Mesh( cylinder, material );
	
	//https://github.com/mrdoob/three.js/issues/1593
  	//a container object
  	dummy = new THREE.Object3D();
	scene.add(dummy);
	
	mesh2 = new THREE.Mesh( cylinder2, material );
	//set position relative to dummy container
	mesh2.position.setY(50);

	dummy.add( mesh2 );

	//mesh.rotation.x = mesh.rotation.x += Math.PI/2;
	//mesh2.rotation.x = mesh2.rotation.x += Math.PI/2;
	dummy.rotation.x = dummy.rotation.x += Math.PI/2;

	//mesh2.position.x = mesh2.position.x += 100;
	//mesh2.position.z = mesh2.position.z += 100;
	
	dummy.add( mesh );
	//scene.add(mesh2);
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
		
		//mesh.scale.x = mesh.scale.x += 0.005;
		//mesh.scale.z = mesh.scale.z += 0.005;
	  	//mesh.scale.y = mesh.scale.y -= 0.04;
	  	
	  	//mesh2.scale.x = mesh2.scale.x += 0.005;
		//mesh2.scale.z = mesh2.scale.z += 0.005;
	  	
	  	dummy.rotation.x = dummy.rotation.x += ( targetRotation - dummy.rotation.x ) * 0.05;

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

