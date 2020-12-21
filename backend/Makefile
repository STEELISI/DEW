build: 
	docker build -t dew:$(shell git log -1 --format=%h) .


create_db:
	mkdir -p db/
	touch database.db

deploy: build create_db
	docker run -m 950MB -p 4000:80 --env-file ./secrets.env -v $(shell pwd)/db:/app/db --name dew-api-$(shell git log -1 --format=%h) -d dew:$(shell git log -1 --format=%h)

deploy_test1: build create_db
	docker run -m 950MB -p 6100:80 --env-file ./secrets.env -v $(shell pwd)/db:/app/db --name dew-api-$(shell git log -1 --format=%h) -d dew:$(shell git log -1 --format=%h)

deploy_test2: build create_db
	docker run -m 950MB -p 6200:80 --env-file ./secrets.env -v $(shell pwd)/db:/app/db --name dew-api-$(shell git log -1 --format=%h) -d dew:$(shell git log -1 --format=%h)

deploy_test3: build create_db
	docker run -m 950MB -p 6300:80 --env-file ./secrets.env -v $(shell pwd)/db:/app/db --name dew-api-$(shell git log -1 --format=%h) -d dew:$(shell git log -1 --format=%h)
