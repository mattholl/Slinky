var UI = function(player, track) {
	this.player = player;
	this._this = this;
	//this.track = track;
    
    

    // $('#pulldown-button').on('click', function(e) {
    // 	$('header').css('top', '0');
    // });
    
    // $('#pulldown-button').toggle(function(e) {
    // 	$('header').css('top', '0');
    // 	console.log('slide down');
    // 	e.preventDefault();
    	
    // }, function(e) {
    // 	$('header').css('top', '-100px');
    // 	console.log('slide up');
    // 	e.preventDefault();
    // })
	

    

    // document.getElementById('track-form').addEventListener('submit', function(e) {
        
        
    // });
    this.attachEvents(this._this, this.player);
    
};

UI.prototype.attachEvents = function(UI, player) {
	//pulldown form
	$('header').on('click', '#ui-pulldown', this.toggleHeader);

	//form sumission
	$('header').on('submit keyup', '#track-form', function(e) {
    	e.preventDefault();

    	console.log('attach events called in UI');
    	console.log(UI);
    	
    	//this = form
    	var trackUrl = (this.elements['track-url'].value);
        player.getTrackFromURL(trackUrl);
    });

};



UI.prototype.loadingIndicator = function() {
	//so adda throbber
	console.log('throbber added');

	//cmd.js - include throbber.js
	cmd("js/throbber.js", function(loaded) {
		
		console.log('success: ' + loaded);
		
		if(loaded === true) {
			//hmmmm need UI to be available here so the throb object is available to call stop on... - or just kill the dom element
			//although it returns true even if throbber.js 404s
			console.log('loaded from cmd.js callback');
			
			console.log(this); //this = window

			var throb = new Throbber({
					color: 'yellow',
					padding: 30,
					size: 40,
					fade: 200,
					clockwise: false
				}).appendTo(document.getElementById('track-image'));

			$(throb.elem).css({
				'position' : 'absolute',
				'top' : '15px',
				'left' : '5px',
			});


			//throb.appendTo(document.getElementById('track-image'));


				//canvas needs
				//display: block;
					// position: absolute;
					// top: 15px;
					// left: 5px;


				//$('#track-image').append(throb);
			throb.start();

			console.log(throb);
			console.log(throb.elem);

				//.appendTo( trackImage ).start();

				//trackImage.append(throb);

				// document.getElementById('b3').onclick = function() {
				// 	throb.toggle();
				// };

				//trackImage.append(canvas);

				//console.log(canvas);
		}
		
	});

}

UI.prototype.killLoadingIndicator = function() {
	//remove dom element
	//kill canvas animation
	$('#track-image canvas').remove();
}

UI.prototype.playReady = function(player) {
	//attach play / stop events
	//need to reset dancer after stop?
	//or reset everything when a new track is searched for
	//remove throbber from play button....
	console.log('throbber removed');
	this.killLoadingIndicator();

	//////
	console.log('play ready');
	//now add
	////TODO
	//add click listener to play-stop-button
	//add hover events as well
	//change opacity
	$('header').on('hover', '#play-stop-button-wrapper', function(e) {
		//e.preventDefault();
		//console.log(this);
		$('#play-stop-button-wrapper').toggleClass('play-button-hover');
		$('#play-stop-button').toggleClass('play-button-hover');
		e.stopPropagation();
		
	});
	$('#success-image').removeClass('success-waiting').addClass('success-ready');

	// $('header').on('hover', '#play-stop-button', function(e) {
	// 	//e.preventDefault();
	// 	//console.log(this);
	// 	$('#play-stop-button-wrapper').toggleClass('play-button-hover');
	// 	$('#play-stop-button').toggleClass('play-button-hover');
	// 	e.stopPropagation();
	// });


	$('header').on('click', '#play-stop-button', function(e) {
		
		//this depresses the button on click
		//need to change to a stop symbol - toggle header up and start dancer playing
		//attach an event so that the next click stop dancer?
		
		//on stop we need to clear the currently rendered canvas as dancer restarts when play is called again
		$('#play-stop-button-wrapper').toggleClass('play-button-click play-button-hover');
		$('#play-stop-button').toggleClass('play-button-click play-button-hover');


		//if ui visisble && if dancer is playing
		var elHeader = $('header');
		if(elHeader.hasClass('open')) {
			app.player.UI.toggleHeader();	
		};

		//app.player.dancer.play();
		console.log('dancer played ');
		console.log('we bubbled');
	});

	// $('header').on('click', '#play-stop-button-wrapper', function(e) {
		
	// 	$('#play-stop-button-wrapper').toggleClass('play-button-click play-button-hover');
	// 	$('#play-stop-button').toggleClass('play-button-click play-button-hover');

	// 	//var player = window.app.player;
	// 	//player.dancer.play();
	// 	console.log('we bubbled');
	// });
};

UI.prototype.updateInfo = function(track) {
	//get dom elements
	//variables should be in player.track
	//javascript is like weaving simultaneous actions and reactions together - creating a web
	//javascript apps - sitting between the server and the browser
	
	var info = {
		title : track.title,
		user : track.user.username
	};

	$('header').render(info);

	$('#track-image img').attr('src', track.artwork_url);
	$('#track-url').attr('href', track.permalink_url);
	$('.user-url').attr('href', track.user.permalink_url);

	//make the success tick not opaque
};

UI.prototype.toggleHeader = function() {
	//easeInExpo
	//http://matthewlein.com/ceaser/

	var elHeader = $('header'),
		elDropDownCircle = elHeader.find('#dropdown-icon');

	if(elHeader.hasClass('open')) {
		//move header element up to close
		$(elHeader).transition({ y: '-100px' }, 200, 'snap');
		//change shape of pulldown button
		//$(elHeader).find('#ui-pulldown').toggleClass('pulldown-triangle pulldown-rectangle');
		
		elDropDownCircle.toggleClass('ui-closed ui-open');

		$('#dropdown-cross').css('display', 'none');

		elHeader.find('#ui-pulldown').css({
			'border-top' : '30px solid #4d4d4d',
			'border-left' : '30px solid transparent',
			'border-right' : '30px solid transparent',
			'width' : '0',
			'height' : '0',
			'background' : 'none'
		});

	} else if(elHeader.hasClass('closed')) {
		//move header element down to open
		$(elHeader).transition({ y: '0' }, 300, 'cubic-bezier(0.460, 0.045, 0.750, 0.150)' );
		//change shape of pulldown button
		//$(elHeader).find('#ui-pulldown').toggleClass('pulldown-triangle pulldown-rectangle');
		
		elDropDownCircle.toggleClass('ui-closed ui-open');
		
		//set dropdown-cross to display none
		$('#dropdown-cross').css('display', 'block');


		//problem with position being reset for icon if a css class is toggled so change these values here
		$(elHeader).find('#ui-pulldown').css({
			'border-top' : 'none',
			'border-left' : 'none',
			'border-right' : 'none',
			'width' : '60px',
			'height' : '30px',
			'background' : '#4d4d4d'
		});

	}

	elHeader.toggleClass('open closed');
};

UI.prototype.trackWarning = function() {
	//post warning
	$('header').render({
		title : "Looks like that's a link to a user page or a set",
		user : "It needs to be a track url."
	});
};

UI.prototype.URLresolved = function() {
	//change the background colour of the button
};



