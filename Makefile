list: 
	@grep '^[^#[:space:]].*:' Makefile
install:
	pnpm install
build: 
	npm run build 
watch: 
	npm run watch
publish: 
	npm publish
