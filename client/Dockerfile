FROM node

WORKDIR /usr/src/app

COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json

RUN npm install
RUN npm install -g serve

COPY ./public ./public
COPY ./src ./src

RUN npm run build

EXPOSE 80

CMD serve -s build -l tcp://0.0.0.0:80