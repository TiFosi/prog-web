const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("### Connected to MongoDB ATLAS");
});

app.get("/", (req, res) => {
    res.send("home");
});

app.listen(port, () => {
    console.log(`### Server is running on port: ${port}`);
});
