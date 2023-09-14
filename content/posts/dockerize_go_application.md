---
title: Using Docker with a Golang Application
description: dockerise a small golang api
date: 09/06/2023
tags:
  - Engineering
  - Golang
---

In this series blogpost, we'll have a look at how to dockerise and build a small golang application using the standard
library and postgres. We'll be using the pkg project structure to also show the small differences on building an
application that does not have a `main.go` in the root of the project.

In this part 1 we will be creating a small `/status` endpoint, creating a `Dockerfile` and running the application in a
docker container.

## Golang Application

The structure of our application is very simple and small, with a `Dockerfile` in the root and a `main.go` file in
the `src` directory.

```bash
├── Dockerfile
├── go.mod
└── src
    └── main.go
```

If you want to have a look at the content of the main file you can find
it [here](https://github.com/josewenzel/docker-golang-api-example/blob/main/src/main.go). In short, the main file serves
a handler for the `/status` endpoint and returns a json with an OK response.

## Dockerfile

In order to run this application in different environments without need to configure each environment we use docker, we
need to create a `Dockerfile`. So let's go step by step. First we need a base image and set the working directory:

```dockerfile
FROM golang:1.20
WORKDIR /app
```

Now we need to "import" our code into the image then downloading the dependencies declared in them:

```dockerfile
COPY go.* ./
RUN go mod download
COPY . ./
```

Once all the needed code for the build is in the working directory we can build our small application by adding:

```dockerfile
RUN go build -C src -o /example-app
```

note that I'm using the -C flag, this flag changes the directory before running the command. This only applies to the go
build command, so anything you do afterwards will not be inside src but just in the active directory. Is also worth
mentioning that if you are using the -C flag it necessarily needs to be the first flag of your command.

Now we're ready to run our application, by adding the last two lines on the file:

```dockerfile
EXPOSE 8080
CMD ["/flagify-app"]
```

This defines our `Dockerfile`. Now that is finished we can build our image, and run it. This is a two-step process (for
now), first we build and tag our image:

```bash
docker build -t example-app .
```

Once this is finished, we can run the container:

```bash
docker run -p 8080:8080 example-app
```

## Testing the Container

Once you have run the `docker run` command, you'll have the application's port 8080 mapped to your own 8080 port. This
means that if you make a request to you 8080 port for the `/status` path, you'll get an OK response. the easiest way for
this is by running:

```bash
curl http://localhost:8080/status
```

In the next blogpost, I'll be creating a small postgres database, refactor some code here to parametrise the port
with an environment variable, and use `docker compose` to facilitate the process of building an application that
consists in more than one container.
