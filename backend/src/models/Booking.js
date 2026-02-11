const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Room",
  },
  checkIn: Date,
  checkOut: Date,
  guests: Number,
  totalAmount: Number,
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    default: "Pending",
  },
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);
