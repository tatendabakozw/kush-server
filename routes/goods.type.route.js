const express = require("express");
const GoodsType = require("../models/GoodsType");
const router = express.Router();

// create a good
// POST request
router.post("/create", async (req, res, next) => {
  try {
    const { name } = req.body;
    const newGoodsType = new GoodsType({
      name,
    });
    const savedGoodsType = await newGoodsType.save();
    return res.status(200).send({ message: "Goods type saved" });
  } catch (error) {
    next(error);
  }
});
// get all goods

router.get("/all", async (req, res, next) => {
  try {
    const all_types = await GoodsType.find({});
    return res
      .status(200)
      .send({ message: "All goods found", goods_type: all_types });
  } catch (error) {
    next(error);
  }
});
module.exports = router;
