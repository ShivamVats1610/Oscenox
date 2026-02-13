const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

const Booking = require("../models/Booking");
const User = require("../models/User");
const Room = require("../models/Room");

/* ===================================================
   ADMIN — ADVANCED DASHBOARD + FINANCIAL REPORT
=================================================== */
router.get(
  "/admin/dashboard",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const GST_RATE = 0.18;
      const PLATFORM_FEE_RATE = 0.05;

      /* ================= DATE RANGE FILTER ================= */
      const { startDate, endDate } = req.query;

      let dateFilter = {};

      if (startDate && endDate) {
        dateFilter = {
          createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
          },
        };
      }

      /* ================= TOTAL USERS ================= */
      const totalUsers = await User.countDocuments({
        isDeleted: { $ne: true },
      });

      /* ================= TOTAL BOOKINGS ================= */
      const totalBookings = await Booking.countDocuments(
        dateFilter
      );

      /* ================= CONFIRMED BOOKINGS ================= */
      const confirmedMatch = {
        status: "Confirmed",
        ...dateFilter,
      };

      const grossData = await Booking.aggregate([
        { $match: confirmedMatch },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);

      const grossRevenue = grossData[0]?.total || 0;

      /* ================= CANCELLED BOOKINGS ================= */
      const cancelledData = await Booking.aggregate([
        {
          $match: {
            status: "Cancelled",
            ...dateFilter,
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);

      const refundLoss = cancelledData[0]?.total || 0;

      /* ================= TAX ================= */
      const taxCollected = grossRevenue * GST_RATE;

      /* ================= PLATFORM FEE ================= */
      const platformFee =
        grossRevenue * PLATFORM_FEE_RATE;

      /* ================= NET REVENUE ================= */
      const netRevenue = grossRevenue - taxCollected;

      /* ================= FINAL PROFIT ================= */
      const profit = netRevenue - platformFee;

      /* ================= ACTIVE ROOMS ================= */
      const activeRooms = await Room.countDocuments({
        isDeleted: { $ne: true },
      });

      /* ================= BOOKING STATUS BREAKDOWN ================= */
      const bookingStatus = await Booking.aggregate([
        { $match: dateFilter },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      /* ================= MONTHLY REVENUE ================= */
      const monthlyRevenue = await Booking.aggregate([
        { $match: confirmedMatch },
        {
          $group: {
            _id: { month: { $month: "$createdAt" } },
            revenue: { $sum: "$totalAmount" },
          },
        },
        { $sort: { "_id.month": 1 } },
      ]);

      res.json({
        totalUsers,
        totalBookings,
        activeRooms,

        grossRevenue,
        taxCollected,
        platformFee,
        netRevenue,
        profit,
        refundLoss,

        bookingStatus,
        monthlyRevenue,
      });
    } catch (error) {
      console.error("Advanced report error:", error);
      res.status(500).json({ message: "Report failed" });
    }
  }
);

module.exports = router;
