const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");

// Get all bookings (Admin)
router.get("/admin/all", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("room")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update booking status
router.put("/admin/:bookingId", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE BOOKING
router.post("/", protect, async (req, res) => {
  const {
    property,
    roomType,
    checkIn,
    checkOut,
    guests,
    totalAmount,
  } = req.body;

  const booking = await Booking.create({
    user: req.user._id,
    property,
    roomType,
    checkIn,
    checkOut,
    guests,
    totalAmount,
  });

  res.status(201).json({ success: true, booking });
});



// Check availability
router.post("/check-availability", async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

    const existingBooking = await Booking.findOne({
      room: roomId,
      status: { $ne: "Cancelled" },
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (existingBooking) {
      return res.json({ available: false });
    }

    res.json({ available: true });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// GET MY BOOKINGS
router.get("/my", protect, async (req, res) => {
  const bookings = await Booking.find({ user: req.user._id }).sort({
    createdAt: -1,
  });

  res.json({ success: true, bookings });
});

module.exports = router;
