const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
    name: { type: String },
    code: { type: String },
});

const RegionModel = mongoose.model("Region", modelSchema);

module.exports = RegionModel;
