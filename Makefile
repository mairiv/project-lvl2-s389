install: 
	npm install

publish: 
	npm publish

lint: 
	npx eslint .

build:
	rm -rf dist
	npm run build

test: 
	npm test

testLive: 
	npm run testWatch
