const mongoose = require("mongoose");

const goodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    parent: {
      type: Object,
    },
    rate: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Good", goodSchema);
