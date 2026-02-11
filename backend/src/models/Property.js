const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  location: String,
  description: String,
  coverImage: String,
}, { timestamps: true });

module.exports = mongoose.model("Property", propertySchema);
