var scaleCanvas = require('autoscale-canvas');

module.exports = function(d3, mapid) {
    var ratio = window.devicePixelRatio || 1,
        retina = ratio !== 1,
        projection = d3.geo.mercator().precision(0),
        path = d3.geo.path().projection(projection);

    function staticUrl(cz, wh) {
        var size = retina ? [wh[0] * 2, wh[1] * 2] : wh;
        return 'http://a.tiles.mapbox.com/v3/' + [
            mapid, cz.join(','), size.join('x')].join('/') + '.png';
    }

    return function(geojson, wh) {
        projection.translate([wh[0]/2, wh[1]/2]);

        var container = d3.select(document.createElement('div'))
            .attr('class', 'static-map-preview'),
            image = container.append('img'),
            canvas = container.append('canvas'),
            z = 19;

        canvas.attr('width', wh[0]).attr('height', wh[1]);
        image.attr('width', wh[0]).attr('height', wh[1]);
        projection.center(projection.invert(path.centroid(geojson)));
        projection.scale((1 << z) / 2 / Math.PI);

        var bounds = path.bounds(geojson);

        while (bounds[1][0] - bounds[0][0] > wh[0] ||
            bounds[1][1] - bounds[0][1] > wh[1]) {
            projection.scale((1 << z) / 2 / Math.PI);
            bounds = path.bounds(geojson);
            z--;
        }
        image.attr('src', staticUrl(projection.center().concat([z-6]), wh));

        var ctx = scaleCanvas(canvas.node()).getContext('2d'),
            painter = path.context(ctx);

        ctx.strokeStyle = '#E000F5';
        ctx.lineWidth = 2;
        painter(geojson);
        ctx.stroke();

        return container;
    };
};
