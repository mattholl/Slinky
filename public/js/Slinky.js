/**
 * central app root object
 * init the connection to the soundcloud api
 * create the player and provide the function to create beats on various threshold
 * from https://github.com/oampo/AmbientCloudsetTimeout
 */

var Slinky  = function() {
	this.clientID = '86961c923d1a04425a46ac1a4a19c675';
	SC.initialize({
		client_id : this.clientID
	});

    this.windowHalfX = window.innerWidth / 2;
    this.windowHalfY = window.innerHeight / 2;

    this.targetRotation = 0;
    this.targetRotationOnMouseDown = 0;
    this.mouseYOnMouseDown = 0;
    this.mouseY = 0;
    
    this.beats = [];
    this.responders = [];

    this.rendererSetup = false;

    this.player = new Player(this, this.ui);
    
};

// called from the onLoad function in Player
Slinky.prototype.init = function() {
    
    //Three.js
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000 );
    this.camera.position.z = 1000;
    
    this.scene.add( this.camera );
    
    this.renderer = new THREE.CanvasRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    document.body.appendChild( this.renderer.domElement );
    this.rendererSetup = true;
    
    this.container = new THREE.Object3D();
    this.scene.add(this.container);

    this.container.rotation.x = this.container.rotation.x += Math.PI/2;

    this.renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );

    this.stats = new Stats();

    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.right = '5px';
    this.stats.domElement.style.top = '5px';

    $('#stats').append( this.stats.domElement );
};

Slinky.prototype.createLowResponders = function() {
    //roughly 0 - 2000Hz
    var startY = -300,
        yInc = 0;
        freqLow = 0,
        freqHigh = 2;

    for(var i = 0; i < 15; i++) {
        (function(i) {
            app.responders[i] = new Responder(startY + yInc*10);
            app.beats[i] = app.player.dancer.createBeat({
                frequency : [freqLow, freqHigh],
                threshold : 0.08,
                onBeat : function() {
                    //start increasing the scale transform on the Responder object for this beat frequency
                    app.responders[i].doScale = true;
                },
                offBeat : function() {
                    //stop increasing scale, allow damping to take effect
                    app.responders[i].doScale = false;
                }
            });
            app.beats[i].on();
        }(i));
        
        freqLow += 3;
        freqHigh += 3;
        yInc += 1;
    }
};

Slinky.prototype.createMidResponders = function() {
    //to centre to column around zero and allow setting freq bins other than incremnting with i
    var startY = -170,
        yInc = 0;
        freqLow = 45,
        freqHigh = 48;

    for(var i = 15; i < 30; i++) {
        (function(i) {
            app.responders[i] = new Responder(startY + yInc*10);
            app.beats[i] = app.player.dancer.createBeat({
                frequency : [freqLow, freqHigh],
                threshold : 0.015,
                onBeat : function() {
                    //start increasing the scale transform on the Responder object for this beat frequency
                    app.responders[i].doScale = true;
                },
                offBeat : function() {
                    //stop increasing scale, allow damping to take effect
                    app.responders[i].doScale = false;
                }
            });
            app.beats[i].on();
        }(i));
        
        freqLow += 5;
        freqHigh += 5;
        yInc += 1;
    }
};

Slinky.prototype.createHighResponders = function() {
    //to centre to column around zero and allow setting freq bins other than incremnting with i
    var startY = -20,
        yInc = 0;
        freqLow = 120,
        freqHigh = 122;

    for(var i = 30; i < 45; i++) {
        (function(i) {
            app.responders[i] = new Responder(startY + yInc*10);
            app.beats[i] = app.player.dancer.createBeat({
                frequency : [freqLow, freqHigh],
                threshold : 0.009,
                onBeat : function() {
                    //start increasing the scale transform on the Responder object for this beat frequency
                    app.responders[i].doScale = true;
                },
                offBeat : function() {
                    //stop increasing scale, allow damping to take effect
                    app.responders[i].doScale = false;
                }
            });
            app.beats[i].on();
        }(i));
        
        freqLow += 3;
        freqHigh += 3;
        yInc += 1;
    }
};

Slinky.prototype.removeRenderer = function() {
    document.body.removeChild( this.renderer.domElement );
};

//fire it up
window.onload = function() {
    window.app = new Slinky();
    window.app.player.UI.toggleHeader();
};

/*
 * Plug in to the dancer objects update function
 */
Dancer.addPlugin( 'ready', function() {
    this.bind( 'update', function() {

        //console.log(this); dancer
        //requestAnimationFrame(update);
        //the function which does the updating

        //start stats
        app.stats.begin();
        //TODO
        //put raf in here
        //same as putting in a timeut with set framerate
        for(var i = 0; i < app.responders.length; i++) {
            app.responders[i].update();
        }
        //use mouse / touch rotation around axis
        app.container.rotation.x = app.container.rotation.x += ( app.targetRotation - app.container.rotation.x ) * 0.05;
        app.renderer.render( app.scene, app.camera );

        //end stats
        app.stats.end();
    });
});

//move these off window?
function onDocumentMouseDown( event ) {
    event.preventDefault();

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    document.addEventListener( 'mouseout', onDocumentMouseOut, false );

    app.mouseYOnMouseDown = event.clientY - app.windowHalfY;
    app.targetRotationOnMouseDown = app.targetRotation;
}

function onDocumentMouseMove( event ) {
    app.mouseY = event.clientY - app.windowHalfY;
    app.targetRotation = app.targetRotationOnMouseDown + ( app.mouseY - app.mouseYOnMouseDown ) * 0.05;
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
