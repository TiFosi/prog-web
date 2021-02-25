const router = require("express").Router();
const TauxIncidenceStdQuot = require("../models/TauxIncidenceStdQuot");

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

module.exports = router;
