FROM node:14.15.5-slim AS base

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install

FROM base as dev
RUN npm install -g nodemon

FROM base as build
COPY ./src ./src
COPY ./.env ./.env