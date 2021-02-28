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
