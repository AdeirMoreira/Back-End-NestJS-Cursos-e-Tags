FROM node:16.13.1-alpine3.15

RUN apk add --no-cache bash

RUN npm i -g @nestjs/cli

USER node

WORKDIR /home/node/app