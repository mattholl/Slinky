/**
 * UI object
 * responds to interactions from the user and deals with visual changes to indicate states:
 */

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
        
        //this = form
        var trackUrl = (this.elements['track-url'].value);
        player.getTrackFromURL(trackUrl);
        
        if((typeof(app.player.dancer) === 'object') && (app.player.dancer.isPlaying() === true)) {
            $('#play-stop-button-wrapper').trigger('click');
        }

        //remove play button event handlers - return to opaque - will get reattached when playReady fires
        $('header').off('hover', '#play-stop-button-wrapper', this.playButtonHover);
        $('header').off('click', '#play-stop-button-wrapper', this.playButtonClick);
    
        //reset ui visuals
        $('#success-image').removeClass('success-ready').addClass('success-waiting');
        $('#play-stop-button-wrapper').removeClass('play-stop-button-wrapper-ready').addClass('play-stop-button-wrapper-waiting');
        $('#play-stop-button').removeClass('play-stop-button-ready').addClass('play-stop-button-waiting');
    });

};

UI.prototype.loadingIndicator = function() {
    //so add a throbber
    cmd("js/throbber.js", function(loaded) {
        
        if(loaded === true) {
            //hmmmm need UI to be available here so the throb object is available to call stop on... - or just kill the dom element
            //although cmd.js returns true even if throbber.js 404s....
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
        }
    });
};



UI.prototype.playButtonHover = function() {
    $('#play-stop-button-wrapper').toggleClass('play-button-hover');
    $('#play-stop-button').toggleClass('play-button-hover');
};

UI.prototype.playButtonClick = function() {
    $('#play-stop-button-wrapper').toggleClass('play-button-click');
    $('#play-stop-button').toggleClass('play-button-click');

    var playing = app.player.dancer.isPlaying();
    
    if(playing === false) {
        app.player.dancer.play();
        //push the header back up
        app.player.UI.toggleHeader();
        $('#play-stop-button').removeClass('play-stop-button-triangle').addClass('play-stop-button-square');
    } else if(playing === true) {
        app.player.dancer.stop();
        console.log('dancer.isplaying true so stop');
        $('#play-stop-button').removeClass('play-stop-button-square').addClass('play-stop-button-triangle');
    }
};


UI.prototype.playReady = function(player) {
    //remove throbber
    $('#track-image canvas').remove();
    
    //atach play events + ui display
    $('header').on('hover', '#play-stop-button-wrapper', this.playButtonHover);
    $('header').on('click', '#play-stop-button-wrapper', this.playButtonClick);
    $('#success-image').removeClass('success-waiting').addClass('success-ready');
    $('#play-stop-button-wrapper').removeClass('play-stop-button-wrapper-waiting').addClass('play-stop-button-wrapper-ready');
    $('#play-stop-button').removeClass('play-stop-button-waiting').addClass('play-stop-button-ready');
};

UI.prototype.updateInfo = function(track) {
    
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
        elDropDownCircle.toggleClass('ui-closed ui-open');

        //remove dropdown close icon
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
        elDropDownCircle.toggleClass('ui-closed ui-open');
        
        //display dropdown close icon
        $('#dropdown-cross').css('display', 'block');

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
        title : "Looks like that's not a direct link to a SoundCloud track",
        user : "It needs to be a track url."
    });
};