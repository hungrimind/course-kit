list: 
	@grep '^[^#[:space:]].*:' Makefile
build: 
	npm run build 
watch: 
	npm run watch
publish: 
	npm run publish
