//global
var dancer,
	beats = [];
 


dancer = new Dancer("http://webdev/canvas/2d/beat_ring_2d/assets//S_P_A_C_E_S_Apologies.ogg");

dancer.playing = false;



//responds to opening claps
beats[0] = dancer.createBeat({
	frequency : [70, 100],
	threshold : 0.01,
	onBeat : function() {
		console.log('clap');
	}
});

beats[1] = dancer.createBeat({
	frequency : [0, 10],
	threshold : 0.4,
	onBeat : function() {
		console.log('bass');
	}
});

// console.log(beats);

beats[0].on();
beats[1].on();

// console.log(dancer);