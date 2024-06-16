const mongoose = require("mongoose");

const goodsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Goods type requires a name"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("GoodsType", goodsSchema);
