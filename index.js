// const express = require('express');
// const mapnik = require('mapnik');

// const app = express();

const tilestrata = require('tilestrata');
const disk = require('tilestrata-disk');
const sharp = require('tilestrata-sharp');
const mapnik = require('tilestrata-mapnik');
const dependency = require('tilestrata-dependency');
const strata = tilestrata();

// define layers
strata.layer('basemap')
    .route('tile@2x.png')
        .use(disk.cache({dir: '/var/lib/tiles/basemap'}))
        .use(mapnik({
            pathname: './basestyle.xml',
            tileSize: 512,
            scale: 2
        }))
    .route('tile.png')
        .use(disk.cache({dir: '/var/lib/tiles/basemap'}))
        .use(dependency('basemap', 'tile@2x.png'))
        .use(sharp(function(image, sharp) {
            return image.resize(256);
        }));

// start accepting requests
strata.listen(8080);

// app.get('/', (_, res) => {
//     const map = new mapnik.Map(600, 600, '+init=epsg:3857');
//     map.load();
//     res.send(map);
// });

// app.listen(8080, () => {
//     console.log('Listening on port 8080');
// });