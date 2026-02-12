const express = require("express");
const PDFDocument = require("pdfkit");
const Booking = require("../models/Booking");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/*
GET INVOICE PDF
/api/invoice/:bookingId
*/
router.get("/:bookingId", protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .populate("user", "name email");

    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    // Only owner or admin can download
    if (
      booking.user._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const doc = new PDFDocument({ margin: 50 });

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${booking._id}.pdf`
    );
    res.setHeader("Content-Type", "application/pdf");

    doc.pipe(res);

    /* ================= HEADER ================= */

    doc
      .fontSize(22)
      .text("OSCENOX INVOICE", { align: "center" })
      .moveDown(2);

    /* ================= CUSTOMER INFO ================= */

    doc
      .fontSize(12)
      .text(`Customer Name: ${booking.user.name}`)
      .text(`Email: ${booking.user.email}`)
      .moveDown();

    /* ================= BOOKING INFO ================= */

    doc
      .text(`Booking ID: ${booking._id}`)
      .text(`Property: ${booking.property}`)
      .text(`Room Type: ${booking.roomType}`)
      .text(
        `Stay: ${new Date(booking.checkIn).toDateString()} - ${new Date(
          booking.checkOut
        ).toDateString()}`
      )
      .text(`Guests: ${booking.guests}`)
      .moveDown();

    /* ================= PRICE ================= */

    doc
      .fontSize(16)
      .text(`Total Amount: ₹ ${booking.totalAmount}`, {
        align: "right",
      })
      .moveDown(2);

    /* ================= FOOTER ================= */

    doc
      .fontSize(10)
      .text("Thank you for booking with OSCENOX", { align: "center" })
      .text("Visit Again!", { align: "center" });

    doc.end();

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
