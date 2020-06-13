= To run

Put mp3 files in the mp3s folder
npm install
node identicon.js

= To import covers
In mp3tag:
1. Select song(s)
2. Actions -> Actions (Quick) -> Import cover from file
3. Format string for image filename: %_filename%.png
   Import cover as: Front Cover
   Delete existing cover art: X

= If it doesn't work, maybe try this:
Install MacPorts: https://www.macports.org/install.php
Install Ciaro: sudo port install cairo

= Alternately
Just run it, and then load identicon_canvas_test.html in a browser. It will render all the canvases, and then download them.
