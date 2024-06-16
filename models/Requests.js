const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Requests", requestsSchema);
