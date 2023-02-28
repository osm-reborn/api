// This example shows how to use node-mapnik to render
// a map to a image on disk
//
// run command: node ./render/app.js ./stylesheet.xml map.png
//
// expected output: https://github.com/mapnik/node-mapnik-sample-code/blob/master/outputs/map.png

var mapnik = require('mapnik');
var sys = require('fs');
var child_process = require('child_process');
var usage = 'usage: render.js <stylesheet> <image>';

var stylesheet = process.argv[2];
if (!stylesheet) {
   console.log(usage);
   process.exit(1);
}

var image = process.argv[3];
if (!image) {
   console.log(usage);
   process.exit(1);
}

// register shapefile plugin
if (mapnik.register_default_input_plugins) mapnik.register_default_input_plugins();

var map = new mapnik.Map(600, 400);

map.loadSync(stylesheet);
map.zoomAll();
map.renderFileSync(image);

console.log('rendered map to ' + image);

if (process.argv.indexOf('--no-open') == -1) {
    child_process.exec('open ' + image);
}