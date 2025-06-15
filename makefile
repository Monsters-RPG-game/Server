clean:
	rm -rf ./build \
	rm tsconfig.tsbuildinfo

test:
	clear \
	&& npm run test:unit \
	&& npm run test:db \
	&& npm run test:e2e

buildDocker:
	export $(shell sed 's/=.*//' .env) && docker build $(shell sed 's/^/--build-arg /' .env) -t monsters/monsters-server .

buildTestDocker:
	export $(shell sed 's/=.*//' .env) && docker build $(shell sed 's/^/--build-arg /' .env) --build-arg NODE_ENV=development -t monsters/monsters-server-test .
