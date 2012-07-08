var UI = function(player, track) {
	this.player = player;
	this.track = track;
    
    $('#track-form').on('submit', function(e) {
    	var trackUrl = (this.elements['track-url'].value);

        player.getTrackFromURL(trackUrl);

        e.preventDefault();
    });

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
	

    $('header').on('click', '#ui-pulldown', this.toggleHeader);

    // document.getElementById('track-form').addEventListener('submit', function(e) {
        
        
    // });
};

UI.prototype.updateInfo = function(track) {
	//get dom elements
	//variables should be in player.track
	//javascript is like weaving simultaneous actions and reactions together - creating a web
	//javascript apps - sitting between the server and the browser
	console.log(track.user);
	
	var info = {
		title : track.title,
		user : track.user.username
	};

	$('header').render(info);

	$('#track-image img').attr('src', track.artwork_url);
	$('#track-url').attr('href', track.permalink_url);
	$('.user-url').attr('href', track.user.permalink_url);
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

		$(elHeader).find('#ui-pulldown').css({
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

	} else {
		return;
	}

	elHeader.toggleClass('open closed');
};