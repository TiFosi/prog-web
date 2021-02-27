const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
    num: { type: String },
    name: { type: String },
    region: { type: String },
    chef: { type: String },
    superficie: { type: String },
    population: { type: String },
    densite: { type: String },
});

const RegionModel = mongoose.model("Region", modelSchema);

module.exports = RegionModel;
