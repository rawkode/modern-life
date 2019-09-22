dshell:
	@docker-compose run --rm --service-ports --entrypoint=ash node

clear-cache:
	@yarn workspace gatsby-theme-rawkode gatsby clean
	@yarn workspace website gatsby clean

deps:
	@yarn install

up:
	@yarn workspace website develop
