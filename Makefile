list: 
	@grep '^[^#[:space:]].*:' Makefile

link:
	pnpm link --global 
	cd ./test-astro 
	pnpm link --global course-kit 
	cd .. 
	cd ./test 
	pnpm link --global course-kit 
	cd ..

install:
	pnpm install

build: 
	npm run build 

watch: 
	npm run watch

astro:
	cd ./test-astro && pnpm install && pnpm run dev

next:
	cd ./test && pnpm install && pnpm run dev

publish: 
	npm publish
