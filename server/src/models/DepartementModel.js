const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
    {
        num: { type: String },
        name: { type: String },
        region: { type: String },
        chef: { type: String },
        superficie: { type: String },
        population: { type: String },
        densite: { type: String },
    },
    { collection: "departements" }
);

const DepartementModel = mongoose.model("Departement", modelSchema);

module.exports = DepartementModel;
