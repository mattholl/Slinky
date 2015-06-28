Slinky
======================

A node server which proxys an audio stream from Soundcloud back to the webapp. A JS app analyses the audio waveform which is then rendered with Three.js.

Please see [the demo](http://www.thingsbymatt.com/projects/slinky-audio-three.js/).

This project uses an express server with [Dancer.js](https://github.com/jsantell/dancer.js) for audio analysis and [Three.js](https://github.com/mrdoob/three.js/) to render with WebGL.

Pasting in any SoundCloud track url will rebuild the visualiser. Note, it must be a URL to a track rather than a playlist.