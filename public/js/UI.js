//UI object 
//responds to interactions from the user and deals with visual changes in the 
//
//
//
var UI = function(player, track, app) {
    this.player = player;
    this.app = app;
    this._this = this;
    
    this.attachEvents(this._this, this.player);
    
};

UI.prototype.attachEvents = function(UI, player) {
    //pulldown form
    $('header').on('click', '#ui-pulldown', this.toggleHeader);

    //form sumission
    $('header').on('submit', '#track-form', function(e) {
        e.preventDefault();

        console.log('form submit responding');
        //console.log(UI);
        
        //this = form
        var trackUrl = (this.elements['track-url'].value);
        player.getTrackFromURL(trackUrl);
        
        //player.dancer.stop();
        //user trigger
        //$('#play-stop-button').trigger('click'); //on stop button

        console.log('form search');
        console.log('is dancer playing');

        $('#play-stop-button-wrapper').trigger('click');

        //remove play button event handlers - return to opaque - will get reattached when playReady fires
        $('header').off('hover', '#play-stop-button-wrapper', this.playButtonHover);
        $('header').off('click', '#play-stop-button-wrapper', this.playButtonClick);
    
        //reset ui visuals
        $('#success-image').removeClass('success-ready').addClass('success-waiting');
        $('#play-stop-button-wrapper').removeClass('play-stop-button-wrapper-ready').addClass('play-stop-button-wrapper-waiting');
        $('#play-stop-button').removeClass('play-stop-button-ready').addClass('play-stop-button-waiting');
        //console.log(app.player.dancer.isPlaying());
        //app.renderer = new THREE.CanvasRenderer();
        
        //app.player.dancer.stop();
        //app.renderer.clear();
        //call setup functions form slinky - create renderer - remove currently appended dom element?
        //create responders ?

        //clear canvas - get rid of geometries? just get written over when dancer loads - no need to unset
        ////remove click listeners
        //on clicking play change the event handerler to a stop - 
        
        //$('')
        //app.renderer -> //this.renderer = new THREE.CanvasRenderer();
        
    });

};



UI.prototype.loadingIndicator = function() {
    //so adda throbber
    console.log('throbber added');
    cmd("js/throbber.js", function(loaded) {
        
        console.log('success: ' + loaded);
        
        if(loaded === true) {
            //hmmmm need UI to be available here so the throb object is available to call stop on... - or just kill the dom element
            //although cmd.js returns true even if throbber.js 404s....
            console.log('loaded from cmd.js callback');
            
            //console.log(this); //this = window

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
                'left' : '5px'
            });

            throb.start();

            console.log('throb started');
        }
    });
};



UI.prototype.playButtonHover = function() {
    $('#play-stop-button-wrapper').toggleClass('play-button-hover');
    $('#play-stop-button').toggleClass('play-button-hover');
};

UI.prototype.playButtonClick = function() {
    //e.stopPropagation();
    //this depresses the button on click
    //need to change to a stop symbol - toggle header up and start dancer playing
    //attach an event so that the next click stop dancer?
    //on stop we need to clear the currently rendered canvas as dancer restarts when play is called again
    $('#play-stop-button-wrapper').toggleClass('play-button-click');
    $('#play-stop-button').toggleClass('play-button-click');

    //check for value of dancer playing

    

    //if ui visisble && if dancer is playing
    var elHeader = $('header');
    if(elHeader.hasClass('open')) {
        
    }

    var playing = app.player.dancer.isPlaying();
    console.log(playing);
    console.log('were playing');
    //app.player.dancer.play();

    

    if(playing === false) {
        app.player.dancer.play();
        //push the header back up
        app.player.UI.toggleHeader();
        console.log('dancer.isplaying false so play');
        $('#play-stop-button').removeClass('play-stop-button-triangle').addClass('play-stop-button-square');
    } else if(playing === true) {
        app.player.dancer.stop();
        console.log('dancer.isplaying true so stop');
        $('#play-stop-button').removeClass('play-stop-button-square').addClass('play-stop-button-triangle');
        //clear canvas no - only clear on search
        //
    }
    
};


UI.prototype.playReady = function(player) {
    //attach play / stop events
    //need to reset dancer after stop?
    //or reset everything when a new track is searched for
    //remove throbber from play button....
    console.log('throbber removed');
    $('#track-image canvas').remove();
    //turn up opacity on green ready indicator
    
    
    //////
    console.log('play ready');
    //now add
    ////TODO
    //add click listener to play-stop-button
    //add hover events as well
    //change opacity on play
    //
    //TODO make this work with bubbling - not working as i'm expecting
    //although won't work in this way when it is bound direct to object, shld be somthing like:
    //$('#play-stop-button-wrapper').on('#play-stop-button', 'hover', this.playButtonHover);
    //something in using height = 0 to get the triangle would a height other then 0 fix it?
    //
    //
    //
    //assign events - remove with .off() when form get focus again?
    //
    //
    //need to do this when new form submission sstarts
    $('header').on('hover', '#play-stop-button-wrapper', this.playButtonHover);
    $('header').on('click', '#play-stop-button-wrapper', this.playButtonClick);
    //$('#play-stop-button-wrapper').on('click', this.playButtonClick);
    $('#success-image').removeClass('success-waiting').addClass('success-ready');
    $('#play-stop-button-wrapper').removeClass('play-stop-button-wrapper-waiting').addClass('play-stop-button-wrapper-ready');
    $('#play-stop-button').removeClass('play-stop-button-waiting').addClass('play-stop-button-ready');
    

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



