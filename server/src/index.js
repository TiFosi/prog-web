const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

// BD connection
const DB_CONNECTION =
    "mongodb+srv://dbUser:dVhfz3JxH76V7Ce@cluster0.5tasy.mongodb.net/sante-publique-france?retryWrites=true&w=majority";
const uri = process.env.DB_CONNECTION || DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once("open", () => {
    console.log("### Connected to MongoDB ATLAS");
});

const tauxIncidenceRouter = require("./routes/TauxIncidence");
app.use("/taux-incidence", tauxIncidenceRouter);

app.get("*", (req, res) => res.status(404).json({}));

// documentaion: app.listen([port[, host[, backlog]]][, callback])
app.listen(port, () => {
    console.log(`### Server is running on port: ${port}`);
});
