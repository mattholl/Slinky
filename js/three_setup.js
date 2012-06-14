var camera,
	scene;
	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2;


(function () {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
	camera.position.z = 550;
	//camera.position.y = 200;
	
	scene.add( camera );


	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );

	//console.log(THREE);

}());


// function onDocumentMouseDown( event ) {

// 		event.preventDefault();

// 		document.addEventListener( 'mousemove', onDocumentMouseMove, false );
// 		document.addEventListener( 'mouseup', onDocumentMouseUp, false );
// 		document.addEventListener( 'mouseout', onDocumentMouseOut, false );

// 		mouseXOnMouseDown = event.clientX - windowHalfX;
// 		targetRotationOnMouseDown = targetRotation;
// 	}

// 	function onDocumentMouseMove( event ) {

// 		mouseX = event.clientX - windowHalfX;

// 		targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;
// 	}

// 	function onDocumentMouseUp( event ) {

// 		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
// 		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
// 		document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
// 	}

// 	function onDocumentMouseOut( event ) {

// 		document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
// 		document.removeEventListener( 'mouseup', onDocumentMouseUp, false );
// 		document.removeEventListener( 'mouseout', onDocumentMouseOut, false );
// 	}