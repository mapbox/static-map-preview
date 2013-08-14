all: static-map-preview.js site.bundle.js

static-map-preview.js: index.js package.json
	browserify -s staticMapPreview index.js > static-map-preview.js

site.bundle.js: index.js site.js package.json
	browserify site.js > site.bundle.js
