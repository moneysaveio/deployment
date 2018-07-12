#!/usr/bin/env bash

cp -R server/ deployment/server/
npm run build:client
# docker build -t moneysaveio/docker-nginx deployment/nginx/
docker build --no-cache -t moneysaveio/docker-web-production:latest deployment/
docker build -t moneysaveio/docker-web-production:latest .

# check processes running with protocols
# sudo netstat -tulpn

# Move all 50x, 40x pages to server so we can mount to nginx container

# Running nginx proxy with volumes mounted
# sudo docker run --name moneysaveio-docker-nginx -p 80:80 -d -v ~/docker-nginx/html:/usr/share/nginx/html moneysaveio/nginx-proxy
# sudo docker run --name moneysaveio-docker-nginx -p 80:8080 -d -v ~/docker-nginx/html:/usr/share/nginx/html moneysaveio/docker-web-production:latest
# sudo docker run --name moneysaveio-docker-nginx -p 80:80 moneysaveio/nginx-proxy

# sudo docker run --name moneysaveio-docker-nginx -p 80:80 -p 443:443 -v /etc/letsencrypt:/etc/letsencrypt -d moneysaveio/docker-nginx

# Useful docker commands
# stop all containers
# remove all containers
# view all containers
# take a snapshot of a container
# view shell of docker containers

# useful netstat commands
