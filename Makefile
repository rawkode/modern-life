dshell:
	@docker-compose run --rm --service-ports --entrypoint=ash node

deps:
	@yarn install

up:
	@yarn workspace website develop
