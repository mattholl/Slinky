/**
 * cobbled together by @mttholl
 */
var container,
	dancer,

	beats = [],
	responders = [],

	stats;

function setup() {
	/**
	 * THREE.js 
	 */
	
	//dummy container to add the beat responders to 
	container = new THREE.Object3D();
	scene.add(container);
	
	//start it off with a little rotation - implies interaction to viewer
	container.rotation.x = container.rotation.x += Math.PI/2;

	/**
	 * Dancer setup
	 */
    //dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets//S_P_A_C_E_S_Apologies.ogg");
    //dancer = new Dancer("http://webdev/canvas/2d/beat_ring_2d/assets/gidi-move.ogg");
    //dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets/milkmaid.ogg");
    //dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets/tones/6070Hz.ogg");
    //dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets/tones/9070Hz.ogg");
    //dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets/bach.mp3");
    //dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets/astroblaster.mp3");
    dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets/Clayhill-Dub.mp3");
    //dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets/air.mp3");
    //dancer = new Dancer("http://webdev/three.js/dancer_pulse/assets/lets-stay-together.mp3");


    dancer.playing = false;

   

    //call dancer plugin function to render three.js renderer and deal with mouse rotation of the dummy container
    dancer.render();

	// frequency the frequency (element of the spectrum) to check for a spike. Can be a single frequency (number) or a range (2 element array) that uses the frequency with highest amplitude. Default: [ 0, 10 ]
	//	12kHz - 20,000 kHz = human hearing range
	// threshold the minimum amplitude of the frequency range in order for a beat to occur. Default: 0.3
	// decay the rate that the previously registered beat's amplitude is reduced by on every frame. Default: 0.02
	// onBeat the callback to be called when a beat is detected.
	// offBeat the callback to be called when there is no beat on the current frame.

	//so pass in here values that we're going to use to increase scale when beat fires and rate at which to shrink it
	createLowResponders();
	createMidResponders();
	createHighResponders();
	

    /**
     * set up stats
     */
    
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    stats.domElement.style.left = '300px';
	document.body.appendChild( stats.domElement );
	stats.setMode(2);
}

Dancer.addPlugin( 'render', function() {

	this.bind( 'update', function() {
	    
	    stats.begin();
	    
	    //do the scaling update for each responder - takes care of the values set by the beat
	    
	    // for(var freq in responders) {
	    // 	responders[freq].update();
	    // }
	    // 
	    for(var i = 0; i < responders.length; i++) {
	    	responders[i].update();
	    }

	    //use mouse / touch rotation around axis
	    container.rotation.x = container.rotation.x += ( targetRotation - container.rotation.x ) * 0.05;
		renderer.render( scene, camera );

		stats.end();
	});

});

window.onload = setup;

