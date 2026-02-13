const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../config/multer");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

/* ===================================================
   GET PROFILE
=================================================== */
router.get("/profile", protect, async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   UPDATE PROFILE IMAGE
=================================================== */
router.put(
  "/profile/image",
  protect,
  upload.single("profileImage"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res
          .status(400)
          .json({ message: "No image uploaded" });
      }

      const user = await User.findById(req.user._id);

      user.profileImage = `/uploads/profile-images/${req.file.filename}`;
      await user.save();

      res.json({
        success: true,
        profileImage: user.profileImage,
      });
    } catch (error) {
      console.error("Profile image update error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ===================================================
   UPDATE PROFILE (NAME + EMAIL)
=================================================== */
router.put("/profile", protect, async (req, res) => {
  try {
    const { name, email } = req.body;

    const user = await User.findById(req.user._id);

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found" });

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   CHANGE PASSWORD
=================================================== */
router.put("/profile/password", protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user._id);

    if (!user)
      return res
        .status(404)
        .json({ message: "User not found" });

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Current password incorrect" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   ADMIN — GET ALL USERS
=================================================== */
router.get(
  "/admin/all",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { status } = req.query;

      let filter = {};

      if (status === "archived") {
        filter.isDeleted = true;
      } else {
        filter.isDeleted = { $ne: true };
      }

      const users = await User.find(filter)
        .select("-password")
        .sort({ createdAt: -1 });

      res.json(users);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ===================================================
   ADMIN — GET SINGLE USER DETAILS
=================================================== */
const Booking = require("../models/Booking");

router.get(
  "/admin/:id/details",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id)
        .select("-password");

      if (!user)
        return res.status(404).json({ message: "User not found" });

      const bookings = await Booking.find({ user: user._id })
        .populate({
          path: "room",
          populate: {
            path: "property",
            select: "name location",
          },
        })
        .sort({ createdAt: -1 });

      const revenueData = await Booking.aggregate([
        { $match: { user: user._id, status: "Confirmed" } },
        {
          $group: {
            _id: null,
            total: { $sum: "$totalAmount" },
          },
        },
      ]);

      const revenue = revenueData[0]?.total || 0;

      res.json({
        user,
        bookings,
        bookingCount: bookings.length,
        revenue,
      });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  }
);




/* ===================================================
   ADMIN — BLOCK / UNBLOCK USER
=================================================== */
router.put(
  "/admin/:id/block",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || user.isDeleted)
        return res.status(404).json({ message: "User not found" });

      user.isBlocked = !user.isBlocked;
      await user.save();

      res.json({
        success: true,
        isBlocked: user.isBlocked,
      });
    } catch (error) {
      console.error("Block user error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ===================================================
   ADMIN — UPDATE ROLE
=================================================== */
router.put(
  "/admin/:id/role",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { role } = req.body;

      if (!["admin", "user"].includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
      }

      const user = await User.findById(req.params.id);

      if (!user || user.isDeleted)
        return res.status(404).json({ message: "User not found" });

      user.role = role;
      await user.save();

      res.json({
        success: true,
        role: user.role,
      });
    } catch (error) {
      console.error("Update role error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ===================================================
   ADMIN — SOFT DELETE USER
=================================================== */
router.delete(
  "/admin/:id",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user || user.isDeleted)
        return res.status(404).json({ message: "User not found" });

      // Prevent self-delete
      if (user._id.toString() === req.user._id.toString()) {
        return res.status(400).json({
          message: "You cannot delete your own account",
        });
      }

      user.isDeleted = true;
      await user.save();

      res.json({
        success: true,
        message: "User archived",
      });
    } catch (error) {
      console.error("Delete user error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);
/* ===================================================
   ADMIN — RESTORE USER
=================================================== */
router.put(
  "/admin/:id/restore",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user)
        return res.status(404).json({ message: "User not found" });

      if (!user.isDeleted)
        return res.status(400).json({ message: "User is not archived" });

      user.isDeleted = false;
      await user.save();

      res.json({
        success: true,
        message: "User restored successfully",
      });
    } catch (error) {
      console.error("Restore user error:", error);
      res.status(500).json({ message: "Server error" });
    }
  }
);


/* ===================================================
   ADMIN TEST ROUTE
=================================================== */
router.get(
  "/admin/test",
  protect,
  allowRoles("admin"),
  (req, res) => {
    res.json({
      success: true,
      message: "Admin access confirmed",
    });
  }
);

module.exports = router;
