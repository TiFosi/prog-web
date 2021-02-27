const router = require("express").Router();
const RegionModel = require("../models/RegionModel");

const error = (res, err) => res.status(400).json(`### Error: ${err}`);

router.route("/").get(async (req, res) => {
    try {
        const result = await RegionModel.find();
        res.json(result);
    } catch (err) {
        error(res, err);
    }
});

module.exports = router;
