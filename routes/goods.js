const express = require("express");
const Good = require("../models/Good");
const router = express.Router();

// create a good
// POST request
router.post("/create", async (req, res, next) => {
  try {
    const { name, rate, parent } = req.body;

    const newGoods = new Good({
      name,
      rate,
      parent,
    });

    await newGoods.save();

    return res.status(200).send({ message: "Goods saved" });
  } catch (error) {
    next(error);
  }
});
// get all goods

router.get("/all", async (req, res, next) => {
  try {
    const { parent } = req.query;
    const all_goods = await Good.find({ parent: parent });
    return res
      .status(200)
      .send({ message: "All goods found", goods: all_goods });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
