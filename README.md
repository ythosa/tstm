<div align="center">
  <h1> TSTM </h1>
</div>


## Description

TSTM is simple & useful task manager application 

## Available scripts

```bash
# start application in development mode
$ docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build

# build application
$ docker-compose build

# run application
$ docker-compose up

# run and build? application
$ docker-compose up --build
```
  
```bash
# see api service logs
$ docker logs tstm_api

# see api database logs
$ docker logs tstm_db 
```
  
```bash
# remove api container
$ docker-compose rm api

# remove auth db container (to clear database)
$ docker-compose rm db
```

```bash
# get all volumes
$ docker volume ls 

# get all images
$ docker images

# get all working processes
$ docker ps
```


## Support

TSTM is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers.

## Stay in touch

- Author - [Babin Ruslan](https://ythosa.github.io)

## License

- TSTM is [MIT licensed](LICENSE).
