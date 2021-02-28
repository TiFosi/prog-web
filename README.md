# Indicateurs de suivi de l'épidémie Covid-19

This repository contains the full code source of the application that we have made to practice both front and back end dev in a MERN stack.

## Installation

### Pré-requis

-   [Docker](https://docs.docker.com/get-docker/)

1. Clone the repository `git clone https://github.com/TiFosi/prog-web.git`
2. In the project's root directory run this command

```bash
docker-compose up -d
```

3. After the completion of the command, use http://localhost:3000 or http://127.0.0.1:3000 to access the application.

-   http://localhost:3000 serves the build of the React site.
-   http://localhost:5000 serves the backend.

## Installation without Docker

### Pré-requis

-   Node.js >= 14.15.5
-   yarn ou npm

1. Clone the repository `git clone https://github.com/TiFosi/prog-web.git`
2. Start the backend `cd server && npm start`
3. Start the frontend `cd client && npm start`

## Architecture

-   The project is divided in two parts: server and client.
-   The client was developed with **React** as follows: `/public` conatins contains all global assets. All the react components used in the project are storedin `/src/components`. `/lib` contains functions used to retrieve data from file, backend or third-party source.
-   The server was developed with **NodeJs**, with the help of **Express.js** and the database is handled by a cloud **NoSql** database [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

```bash
.
│   docker-compose.dev.yml
│   docker-compose.yml
│   README.md
│
├───client
│   │   .gitignore
│   │   Dockerfile
│   │   package-lock.json
│   │   package.json
│   │
│   ├───public
│   │       antd.compact.css
│   │       antd.dark.css
│   │       index.html
│   │
│   └───src
│       │   App.js
│       │   index.js
│       │
│       ├───components
│       │       Chart.js
│       │       DataTable.js
│       │       Filters.js
│       │       Main.js
│       │       Map.js
│       │       NationalSituation.js
│       │
│       └───lib
│               fetchFromBackend.js
│               fetchFromCoronavirusAPI.js
│               geo.json
│
└───server
    │   .gitignore
    │   Dockerfile
    │   package-lock.json
    │   package.json
    │
    └───src
        │   index.js
        │
        ├───models
        │       DepartementModel.js
        │       RegionModel.js
        │       TauxIncidenceStdQuot.js
        │       TauxIncidenceStdQuotDep.js
        │       TauxIncidenceStdQuotReg.js
        │
        └───routes
                DepartementRouter.js
                RegionRouter.js
                TauxIncidence.js
```
