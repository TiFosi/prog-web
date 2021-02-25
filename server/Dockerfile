FROM node

WORKDIR /usr/src/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install

COPY ./src ./src
COPY ./.env ./.env

EXPOSE 5000

CMD [ "npm", "start" ]