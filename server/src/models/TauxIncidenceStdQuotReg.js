const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema(
    {
        reg: { type: Number },
        jour: { type: String },
        pop: { type: Number },
        P: { type: Number },
        tx_std: { type: Number },
    },
    { collection: "taux-incidence-std-quot-reg" }
);

const TauxIncidenceStdQuotReg = mongoose.model(
    "TauxIncidenceStdQuotReg",
    modelSchema
);

module.exports = TauxIncidenceStdQuotReg;
