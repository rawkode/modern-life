dshell:
	@docker-compose run --rm --service-ports --entrypoint=ash gatsby

clear-cache:
	@yarn workspace website gatsby clean

deps:
	@yarn install

up:
	@yarn workspace website gatsby develop --host 0.0.0.0

build:
	@yarn workspace website gatsby build
