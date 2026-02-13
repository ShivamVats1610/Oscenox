const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const Booking = require("../models/Booking");
const sendInvoiceEmail = require("../../utils/sendInvoiceEmail");

/* ===================================================
   ADMIN — GET ALL BOOKINGS
=================================================== */
router.get(
  "/admin/all",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("user", "name email")
        .populate({
          path: "room",
          populate: {
            path: "property",
            select: "name location",
          },
        })
        .sort({ createdAt: -1 });

      res.json(bookings);
    } catch (error) {
      console.error("Admin bookings error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ===================================================
   ADMIN — UPDATE STATUS
=================================================== */
router.put(
  "/admin/:bookingId",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { status } = req.body;

      const booking = await Booking.findById(
        req.params.bookingId
      );

      if (!booking)
        return res
          .status(404)
          .json({ message: "Booking not found" });

      booking.status = status;
      await booking.save();

      res.json({ success: true, message: "Status updated" });
    } catch (error) {
      console.error("Update status error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ===================================================
   CREATE BOOKING
=================================================== */
router.post("/", protect, async (req, res) => {
  try {
    const { room, checkIn, checkOut, guests, totalAmount } =
      req.body;

    const booking = await Booking.create({
      user: req.user._id,
      room,
      checkIn,
      checkOut,
      guests,
      totalAmount,
      status: "Pending",
    });

    // Send email in background
    sendInvoiceEmail(booking, req.user)
      .then(() => console.log("Invoice email sent"))
      .catch((err) =>
        console.log("Email failed:", err.message)
      );

    res.status(201).json({ success: true, booking });
  } catch (error) {
    console.error("Create booking error:", error);
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
      status: { $ne: "Cancelled" }, // FIXED CASE
      $or: [
        {
          checkIn: { $lt: new Date(checkOut) },
          checkOut: { $gt: new Date(checkIn) },
        },
      ],
    });

    if (existing) return res.json({ available: false });

    res.json({ available: true });
  } catch (error) {
    console.error("Availability check error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   MY BOOKINGS
=================================================== */
router.get("/my", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user._id,
    })
      .populate("user", "name email") // optional but safe
      .populate({
        path: "room",
        populate: {
          path: "property",
          select: "name location",
        },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error("My bookings error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   USER CANCEL BOOKING
=================================================== */
router.put("/cancel/:id", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res
        .status(404)
        .json({ message: "Booking not found" });

    if (
      booking.user.toString() !==
      req.user._id.toString()
    )
      return res
        .status(403)
        .json({ message: "Unauthorized" });

    booking.status = "Cancelled"; // FIXED CASE
    await booking.save();

    res.json({ success: true });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Cancel failed" });
  }
});

module.exports = router;
