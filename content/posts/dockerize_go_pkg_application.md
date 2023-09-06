---
title: How to Dockerize a Golang Application
description: Using docker and the pkg project structure
date: 10/22/2023
state: published
tags:

- Engineering
- Golang

---

The reason I made this post is due to me not being able to find a good tutorial about containerise a "medium"
applications. Most of them show you how to do it with a simple `main.go` file in the root directory. I want to have my
code a little more organised and with a database as well so these tutorials where not really helpful (for me at
least). In this blogpost I'll show you how I make a small feature flag service in golang.

## Database

I'm using a `docker-compose.yml` to run the whole system. The first thing I did was to create an easy instance of a
postgres database. first I needed to model a couple tables, given the application is tiny, the model is simple
and not too smart, this is my `create_table.sql` file:

```sql
CREATE TABLE IF NOT EXISTS projects (
    project_id VARCHAR(225) NOT NULL,
    name VARCHAR(225) NOT NULL,
    PRIMARY KEY (project_id)
);

CREATE TABLE IF NOT EXISTS flags (
    flag_id VARCHAR(225) NOT NULL,
    name VARCHAR(225) NOT NULL,
    value BOOLEAN NOT NULL,
    canary_setting INT DEFAULT 100 NOT NULL CHECK (canary_setting BETWEEN 1 AND 100),
    project_id VARCHAR(255) NOT NULL,
    PRIMARY KEY (flag_id)
);

ALTER TABLE flags
    ADD CONSTRAINT fk_project
        FOREIGN KEY (project_id)
            REFERENCES projects(project_id)
            ON DELETE CASCADE;
```

This file is ran on initialisation of the database container, and once the container is destroyed it will not store any
of the data that was stored while it was up (important to note that if you want to persist the data you can by adding
a `volumes` item in your `docker-compose.yml`). After I declared my tables I created a small `docker-compose.yml` to run
my database:

```yaml
version: '1'

services:
  flagify-db:
    image: postgres
    restart: always
    environment:
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
      - POSTGRES_DB=${POSTGRES_DB}
    ports:
      - '5438:5432'
    volumes:
      - ./db/create_tables.sql:/docker-entrypoint-initdb.d/create_tables.sql
```

_Note that the environment list is receiving variables, you can do this cause `docker` supports `.env` files, so if you
have one you only need to add those 3 variables, and you're good to go._

## Application

For the sake of this post I will not integrate the database with the application (this will come in a later post), so
for now I've created a small application with the following structure:

```
├── db
├── src
│   └── api
│       ├── handler
│       ├── route
│       └── security
├── main.go
```

For now is just a handler for `/status` to return OK or not in case the user's Authorization header is correct or not.
Fairly straight forward. so in order to build and run my application we need to create a `Dockerfile`, so let's go step
by step.

First we need a base image and set the working directory:

```
FROM golang:1.20

WORKDIR /app
```

Now we need to "import" our code into the image, by copying the `go.mod` and `go.sum` files, and then downloading the
dependencies declared in them (for now I'm just using a very lightweight http library
called [chi](https://github.com/go-chi/chi/):

```
COPY go.* ./
RUN go mod download
COPY . ./
```

Once all the needed code for the build is in the working directory we can build our small application by adding:

```
RUN go build -C src -o /flagify-app
```

note that I'm using the `-C` flag, this flag changes the directory before running the command. This only applies to
the `go build` command, so anything you do afterwards will not be inside `src` but just in the active directory. Is also
worth mentioning that if you are using the `-C` flag it necessarily needs to be the first flag of your command.

Now we're ready to run our application, by adding the last two lines on the file:

```
EXPOSE 8123
CMD ["/flagify-app"]
```

now that our `Dokerfile` is finished, we can test it out by building the image and then running it. I'll just share both
commands here, but if you want a further explanation on how this works, you can
visit [docker's official documentation](https://docs.docker.com/get-started/02_our_app/).

To build the image with a given tag name you need to run:

```
docker build -t <tag-name> .
```

Once the image is build it is stored in your machine, so you can run the image by referencing the tag you gave to it:

```
docker run -p 8080:8123 <tag-name>
```

Another thing that is might noting is that the port in the `run` command is important, the `-p` flag stands for
_publish_ and it serves as a mapping of ports from the host to the container. In this case you are saying that the host
port of `8080` will be mapped to the `8123` port of the container (which is the port exposed by the application).

Now if your application is running correctly you should receive an unauthorized response if running:

```
curl http://localhost:8080/status
```

## Finishing docker-compose.yml

Now that your application and your database are setup you want to avoid manually building and running both of them, this
is where `docker compose` comes to play. We already saw that the compose file contains our database, but we can add as
many services as we want. And your application is a service, so let's add it to the docker compose file, by adding this
to the `services` attribute on the `docker-compose.yaml`

```yaml
  flagify-app:
    build: .
    ports:
      - "8123:8123"
    env_file: .env
    depends_on:
      - flagify-db
```

Now that your compose file has both the db and the app, you can simply run `docker compose up` and see how both your
database and application are build and run with one simple and replicable command.

In the next post I'll be showing you how I implement the simple service, how to integrate the database and how to set up
the http server in more detail.
