Slinky
======================

Slinky is a Three.js webapp which visualises music from SoundCloud. A node server proxys an audio stream from Soundcloud to the webapp.

<!-- Please see [the demo](http://www.slinky.thingsbymatt.com). -->

This project uses an express server with [Dancer.js](https://github.com/jsantell/dancer.js) for audio analysis and [Three.js](https://github.com/mrdoob/three.js/) to render with WebGL.

Pasting in any SoundCloud track url will rebuild the visualiser. Note, it must be a URL to a track rather than a playlist, and Safari 6 does does not currently support processing audio from a media element source.