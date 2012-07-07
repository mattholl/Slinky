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
	

    $('header').on('click', '.pulldown-triangle', this.toggleHeader);

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

	var elHeader = $('header');

	if(elHeader.hasClass('open')) {
		$(elHeader).transition({ y: '-100px' }, 200, 'snap');

	} else if(elHeader.hasClass('closed')) {
		$(elHeader).transition({ y: '0' }, 300, 'cubic-bezier(0.460, 0.045, 0.750, 0.150)' );

	} else {
		return;
	}

	elHeader.toggleClass('open closed');
};