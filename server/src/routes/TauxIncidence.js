const router = require("express").Router();

const TauxIncidenceStdQuot = require("../models/TauxIncidenceStdQuot");
const TauxIncidenceStdQuotReg = require("../models/TauxIncidenceStdQuotReg");
const TauxIncidenceStdQuotDep = require("../models/TauxIncidenceStdQuotDep");
const RegionModel = require("../models/RegionModel");
const DepartementModel = require("../models/DepartementModel");

const error = (res, err) => res.status(400).json(`### Error: ${err}`);

router.route("/std-quot-fra").get(async (req, res) => {
    try {
        const result = await TauxIncidenceStdQuot.find().map((data) =>
            data
                .map((item) => ({
                    date: item["jour"],
                    nb_pos: item["P"],
                    tx_std: item["tx_std"],
                }))
                .sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                })
        );

        res.json(result);
    } catch (err) {
        error(res, err);
    }
});

router.route("/std-quot-reg/:id").get(async (req, res) => {
    try {
        const RegionData = await RegionModel.findById(req.params.id);

        const result = await TauxIncidenceStdQuotReg.find({
            reg: parseInt(RegionData.code),
        }).map((data) =>
            data
                .map((item) => ({
                    date: item["jour"],
                    nb_pos: item["P"],
                    tx_std: item["tx_std"],
                }))
                .sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                })
        );

        res.json(result);
    } catch (err) {
        error(res, err);
    }
});

router.route("/std-quot-dep/:id").get(async (req, res) => {
    try {
        const DepartementData = await DepartementModel.findById(req.params.id);

        const result = await TauxIncidenceStdQuotDep.find({
            dep: parseInt(DepartementData.code),
        }).map((data) =>
            data
                .map((item) => ({
                    date: item["jour"],
                    nb_pos: item["P"],
                    tx_std: item["tx_std"],
                }))
                .sort((a, b) => {
                    return new Date(b.date) - new Date(a.date);
                })
        );

        res.json(result);
    } catch (err) {
        error(res, err);
    }
});

module.exports = router;
