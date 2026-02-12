const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");
const sendInvoiceEmail = require("../../utils/sendInvoiceEmail");


/* ===================================================
   ADMIN — GET ALL BOOKINGS
=================================================== */
router.get("/admin/all", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate({
        path: "room",
        populate: { path: "property", select: "name location" },
      })
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   ADMIN — UPDATE STATUS
=================================================== */
router.put("/admin/:bookingId", async (req, res) => {
  try {
    const { status } = req.body;

    const booking = await Booking.findById(req.params.bookingId);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    res.json({ message: "Status updated" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   CREATE BOOKING
=================================================== */
router.post("/", protect, async (req, res) => {
  try {
    const { room, checkIn, checkOut, guests, totalAmount } = req.body;

    const booking = await Booking.create({
      user: req.user._id,
      room,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      status: "Pending",
    });

    // background email send
    sendInvoiceEmail(booking, req.user)
      .then(() => console.log("Invoice email sent"))
      .catch(err => console.log("Email failed:", err.message));

    res.status(201).json({ success: true, booking });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Booking failed" });
  }
});


/* ===================================================
   CHECK AVAILABILITY
=================================================== */
router.post("/check-availability", async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

    const existing = await Booking.findOne({
      room: roomId,
      status: { $ne: "cancelled" },
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (existing) return res.json({ available: false });

    res.json({ available: true });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   MY BOOKINGS
=================================================== */
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate({
        path: "room",
        populate: { path: "property", select: "name location" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

router.put("/cancel/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    if (booking.user.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    booking.status = "cancelled";
    await booking.save();

    res.json({ success: true });
  } catch {
    res.status(500).json({ message: "Cancel failed" });
  }
});


module.exports = router;
