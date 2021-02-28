const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
    {
        name: { type: String },
        code: { type: String },
    },
    { collection: "departements" }
);

const DepartementModel = mongoose.model("Departement", modelSchema);

module.exports = DepartementModel;
