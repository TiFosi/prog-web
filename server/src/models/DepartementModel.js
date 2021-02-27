const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
    name: { type: String },
});

const DepartementModel = mongoose.model("Departement", modelSchema);

module.exports = DepartementModel;
