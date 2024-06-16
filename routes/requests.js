const express = require("express");
const Requests = require("../models/Requests");
const router = express.Router();

// create requests
// POST request
router.post("/create", async (req, res, next) => {
  try {
    // console.log(create)
    const { email, message } = req.body;
    const newRequest = Requests({
      email,
      message,
    });
    await newRequest.save();
    return res.status(200).send({ message: "New request sent" });
  } catch (error) {
    next(error);
  }
});

// get all requests
// GET request
router.get("/all", async (req, res, next) => {
  try {
    const requests = await Requests.find({});
    return res.status(200).send({ message: "Found all", requests });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
