// dancer.responders.js
/*
 * soooo create the responders arrays within the setup function
 * but call update and draw functions from here
 */

(function() {
  Dancer.addPlugin( 'responders', function() {
   
    this.bind( 'update', function() {
      if(responders.clapBeat.length !== 0) {
        	for (var i =  0; i < responders.clapBeat.length; i++) {
        		responders.clapBeat[i].update();
        		responders.clapBeat[i].display();
        	};
        }
    });

    return this;
  });
})();


// (function() {
//   Dancer.addPlugin( 'fft', function( canvasEl, options ) {
//     options = options || {};
//     var
//       ctx     = canvasEl.getContext( '2d' ),
//       h       = canvasEl.height,
//       w       = canvasEl.width,
//       width   = options.width || 1,
//       spacing = options.spacing || 0,
//       count   = options.count || 256;

//     ctx.fillStyle = options.fillStyle || "white";

//     this.bind( 'update', function() {
//       var spectrum = this.getSpectrum();
//       ctx.clearRect( 0, 0, w, h );
//       for ( var i = 0, l = spectrum.length; i < l && i < count; i++ ) {
//         ctx.fillRect( i * ( spacing + width ), h, width, -spectrum[ i ] * h );
//       }
//     });

//     return this;
//   });
// })();