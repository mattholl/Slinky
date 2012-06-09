//global
var dancer = new Dancer("http://webdev/canvas/2d/beat_ring_2d/assets//S_P_A_C_E_S_Apologies.ogg");

dancer.playing = false;
//dancer.play();

var beat = dancer.createBeat({
	frequency : [2, 100],
	onBeat : function() {
		console.log('beat');
	}
});

beat.on();


console.log(dancer);