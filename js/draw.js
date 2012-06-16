//Globals
var container,
	dancer,
	beats = {},
	responders = {};

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
    dancer = new Dancer("http://webdev/canvas/2d/beat_ring_2d/assets//S_P_A_C_E_S_Apologies.ogg");
    dancer.playing = false;

    //call dancer plugin function to render three.js renderer and deal with mouse rotation of the dummy container
    dancer.render();

	// frequency the frequency (element of the spectrum) to check for a spike. Can be a single frequency (number) or a range (2 element array) that uses the frequency with highest amplitude. Default: [ 0, 10 ]
	//	12kHz - 20,000 kHz = human hearing range
	// threshold the minimum amplitude of the frequency range in order for a beat to occur. Default: 0.3
	// decay the rate that the previously registered beat's amplitude is reduced by on every frame. Default: 0.02
	// onBeat the callback to be called when a beat is detected.
	// offBeat the callback to be called when there is no beat on the current frame.

	responders.clap = new Responder();

	//intro clap 209Hz
    beats.clap = dancer.createBeat({
		frequency : [4,5],
		threshold : 0.1,
		onBeat : function() {
			//create new responder give it params (frequency, time canvas centre)
			//var responder = new Responder(10, [4,5], Date.now(), '#d4b3c2');
			//console.log('beat');
			responders.clap.update();	
			//start increasing the scale transform on the Responder object
		},
		offBeat : function() {
			//stop incrasing scale

		}
	});
	

    beats.clap.on();

}

Dancer.addPlugin( 'render', function() {

	this.bind( 'update', function() {
	    
	    //cylinders created in setup
	    //
	    //here we need to do drawing?
	    
	    container.rotation.x = container.rotation.x += ( targetRotation - container.rotation.x ) * 0.05;
		renderer.render( scene, camera );


	});


});

window.onload = setup;

