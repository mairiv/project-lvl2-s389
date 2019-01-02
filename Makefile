install: 
	npm install

publish: 
	npm publish

start: 
	npx babel-node -- src/bin/brain-games.js

start_even: 
	npx babel-node -- src/bin/brain-even.js

start_calc: 
	npx babel-node -- src/bin/brain-calc.js

start_gcd: 
	npx babel-node -- src/bin/brain-gcd.js

start_progression: 
	npx babel-node -- src/bin/brain-progression.js

start_prime: 
	npx babel-node -- src/bin/brain-prime.js

lint: 
	npx eslint .

build:
	rm -rf dist
	npm run build