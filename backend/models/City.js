const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  city_name: { type: String, required: true },
  country: { type: String, required: true, default: "US" },
});

module.exports = mongoose.model("City", citySchema);
