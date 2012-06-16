var camera,
	scene;
	windowHalfX = window.innerWidth / 2,
	windowHalfY = window.innerHeight / 2,

	targetRotation = 0,
	targetRotationOnMouseDown = 0;


(function () {
	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 10000 );
	//camera = new THREE.OrthographicCamera( 0, 0, 0, 1, 10000 );
	
	//camera = new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, -10000, 10000 );

	camera.position.z = 500;
	//camera.position.y = 200;
	
	scene.add( camera );


	renderer = new THREE.CanvasRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );

	document.body.appendChild( renderer.domElement );
	//
	//console.log(THREE);

}());


