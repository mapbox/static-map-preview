var d3 = require('d3'),
    preview = require('./')(d3, 'tmcw.map-dsejpecw');

preview({
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -129.55078125,
              20.632784250388028
            ],
            [
              -129.55078125,
              51.6180165487737
            ],
            [
              -56.77734375,
              51.6180165487737
            ],
            [
              -56.77734375,
              20.632784250388028
            ],
            [
              -129.55078125,
              20.632784250388028
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -8.96484375,
              49.38237278700955
            ],
            [
              -8.96484375,
              59.62332522313024
            ],
            [
              4.74609375,
              59.62332522313024
            ],
            [
              4.74609375,
              49.38237278700955
            ],
            [
              -8.96484375,
              49.38237278700955
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              5.80078125,
              35.60371874069731
            ],
            [
              5.80078125,
              47.98992166741417
            ],
            [
              20.56640625,
              47.98992166741417
            ],
            [
              20.56640625,
              35.60371874069731
            ],
            [
              5.80078125,
              35.60371874069731
            ]
          ]
        ]
      }
    }
  ]
}, [200, 200], function(err, data) {
    d3.select('body')
        .append('img')
        .attr('width', 200)
        .attr('height', 200)
        .attr('src', data);
});
