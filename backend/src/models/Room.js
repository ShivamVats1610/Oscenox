const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
  property: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  title: { type: String, required: true },
  description: String,
  pricePerNight: Number,
  capacity: Number,
  amenities: [String],
  images: [String],
}, { timestamps: true });

module.exports = mongoose.model("Room", roomSchema);
