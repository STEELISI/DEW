build: 
	docker build -t dew:$(shell git log -1 --format=%h) .


create_db:
	mkdir -p db/
	touch database.db

deploy: build create_db
	docker run -m 350MB -p 4000:80 -v $(shell pwd)/db:/app/db --name dew-api-$(shell git log -1 --format=%h) -d dew:$(shell git log -1 --format=%h)