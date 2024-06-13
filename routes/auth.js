const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

//login user
// post requestt
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    // create user of not exist
    if (!user) {
      const newUser = new User({
        password,
        email,
      });

      const newUserItem = await newUser.save();

      const token = await jwt.sign(
        {
          email: newUserItem.email,
          _id: newUserItem._id,
        },
        process.env.JWT_SECRET
      );
      if (token) {
        const lo_user = {
          email: newUserItem.email,
          _id: newUserItem._id,
          token: token,
        };

        return res.send({ ...lo_user, message: "logged in sucessfully" });
      }
    }

    const token = await jwt.sign(
      {
        email: user.email,
        _id: user._id,
      },
      process.env.JWT_SECRET
    );
    if (token) {
      const lo_user = {
        email: user.email,
        _id: user._id,
        token: token,
      };

      return res.send({ ...lo_user, message: "logged in sucessfully" });
    }
    return res.status(500).send({ message: "Problem loggin in" });
  } catch (error) {
    next(error);
  }
});

// create account
// post request
router.post("/register", async (req, res, next) => {
  try {
    const { password, confirm_password, email } = req.body;

    const user = await User.findOne({ email: email });
    if (user) {
      return res
        .status(404)
        .send({ message: "User with id already registered" });
    }

    if (!email) {
      return res.status(400).send({ message: "Please provide an email" });
    }

    if (password !== confirm_password) {
      return res.status(401).send({ message: "Passwords do not match" });
    }
    if (password <= 6) {
      return res
        .status(401)
        .send({ message: "Passwords must be greater than 6 characters" });
    }

    const newUser = new User({
      password,
      email,
    });

    await newUser.save();

    return res.status(200).send({ message: "Applicaction sent!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
