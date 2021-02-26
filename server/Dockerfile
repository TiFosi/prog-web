FROM node:14.15.5-slim AS base

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
RUN npm install

FROM base as build
CMD npm start