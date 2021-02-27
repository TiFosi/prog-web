const router = require("express").Router();
const DepartementModel = require("../models/DepartementModel");

const error = (res, err) => res.status(400).json(`### Error: ${err}`);

router.route("/").get(async (req, res) => {
    try {
        const result = await DepartementModel.find();
        res.json(result);
    } catch (err) {
        error(res, err);
    }
});

router.route("/:id").get(async (req, res) => {
    try {
        const result = await DepartementModel.findById(req.params.id);
        res.json(result);
    } catch (err) {
        error(res, err);
    }
});

module.exports = router;
