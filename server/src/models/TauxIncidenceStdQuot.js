const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
    {
        fra: { type: String },
        jour: { type: String },
        pop: { type: Number },
        P: { type: Number },
        tx_std: { type: Number },
    },
    { collection: "taux-incidence-std-quot-fra" }
);

const TauxIncidenceStdQuot = mongoose.model(
    "TauxIncidenceStdQuot",
    modelSchema
);

module.exports = TauxIncidenceStdQuot;
