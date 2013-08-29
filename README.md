## static-map-preview

### example

```js
var preview = require('static-map-preview')(d3)('mapbox.map-id');

                        // GeoJSON      w,   h
preview(geoJsonObject, [200, 200], function(err, res) {
    // err is an error, if any
    // res is image data as a data url
});
```
