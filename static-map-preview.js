(function(e){if("function"==typeof bootstrap)bootstrap("staticmappreview",e);else if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else if("undefined"!=typeof ses){if(!ses.ok())return;ses.makeStaticMapPreview=e}else"undefined"!=typeof window?window.staticMapPreview=e():global.staticMapPreview=e()})(function(){var define,ses,bootstrap,module,exports;
return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var scaleCanvas = require('autoscale-canvas');

module.exports = function(d3, mapid) {
    var ratio = window.devicePixelRatio || 1,
        retina = ratio !== 1;

    function staticUrl(cz, wh) {
        var size = retina ? [wh[0] * 2, wh[1] * 2] : wh;
        return 'http://a.tiles.mapbox.com/v3/' + [
            mapid, cz.join(','), size.join('x')].join('/') + '.png';
    }

    return function(geojson, wh, callback) {
        var projection = d3.geo.mercator()
            .precision(0)
            .translate([wh[0]/2, wh[1]/2]);

        path = d3.geo.path().projection(projection);

        var image = d3.select(document.createElement('img')),
            canvas = d3.select(document.createElement('canvas')),
            z = 19;

        canvas.attr('width', wh[0]).attr('height', wh[1]);
        projection.center(projection.invert(path.centroid(geojson)));
        projection.scale((1 << z) / 2 / Math.PI);

        var bounds = path.bounds(geojson);

        while (bounds[1][0] - bounds[0][0] > wh[0] ||
               bounds[1][1] - bounds[0][1] > wh[1]) {
            projection.scale((1 << z) / 2 / Math.PI);
            bounds = path.bounds(geojson);
            z--;
        }

        var ctx = scaleCanvas(canvas.node()).getContext('2d'),
        painter = path.context(ctx);

        ctx.strokeStyle = '#E000F5';
        ctx.lineWidth = 2;

        image.node().crossOrigin = '*';
        image
            .on('load', imageload)
            .on('error', imageerror)
            .attr('src', staticUrl(projection.center().concat([z-6]).map(filterNan), wh));

        function imageload() {
            ctx.drawImage(this, 0, 0, wh[0], wh[1]);
            painter(geojson);
            ctx.stroke();
            callback(null, canvas.node().toDataURL());
        }

        function imageerror(err) {
            callback(err);
        }
    };

    function filterNan(_) { return isNaN(_) ? 0 : _; }
};

},{"autoscale-canvas":2}],2:[function(require,module,exports){

/**
 * Retina-enable the given `canvas`.
 *
 * @param {Canvas} canvas
 * @return {Canvas}
 * @api public
 */

module.exports = function(canvas){
  var ctx = canvas.getContext('2d');
  var ratio = window.devicePixelRatio || 1;
  if (1 != ratio) {
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width *= ratio;
    canvas.height *= ratio;
    ctx.scale(ratio, ratio);
  }
  return canvas;
};
},{}]},{},[1])
(1)
});
;