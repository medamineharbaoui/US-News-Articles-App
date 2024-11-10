const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String },
  description: { type: String },
  authors: { type: String },
  content: { type: String, required: true },
  publication_date: { type: String },
  location: { type: String },
  isGlobal: { type: Boolean, required: true }, // New field to store classification (local or global)
});

module.exports = mongoose.model("Article", articleSchema);
