#! /bin/bash

# cat files into one js/build/app.js
# minify / uglify app.min.js

cat public/js/jquery/jquery-1.7.2.min.js \
	public/js/jquery/transparency.min.js \
	public/js/jquery/jquery.transit.js \
	public/js/Responder.js \
	public/js/Three.js \
	public/js/Stats.js \
	public/js/cmd.js \
	public/js/UI.js \
	public/js/dancer.js \
	public/js/Slinky.js \
	public/js/Player.js \
>public/js/build/app.min.js

uglifyjs --overwrite public/js/build/app.min.js