const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
    {
        dep: { type: Number },
        jour: { type: String },
        pop: { type: Number },
        P: { type: Number },
        tx_std: { type: Number },
    },
    { collection: "taux-incidence-std-quot-dep" }
);

const TauxIncidenceStdQuotDep = mongoose.model(
    "TauxIncidenceStdQuotDep",
    modelSchema
);

module.exports = TauxIncidenceStdQuotDep;
