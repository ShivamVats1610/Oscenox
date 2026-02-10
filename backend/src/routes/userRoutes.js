const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../config/multer");
const User = require("../models/User");

// Normal protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
    profileImage: req.user.profileImage,
  });
});

// GET PROFILE
router.get("/profile", protect, async (req, res) => {
  res.json({ success: true, user: req.user });
});

// UPDATE PROFILE IMAGE
router.put(
  "/profile/image",
  protect,
  upload.single("profileImage"),
  async (req, res) => {
    const user = await User.findById(req.user._id);

    user.profileImage = `/uploads/profile-images/${req.file.filename}`;
await user.save();


    res.json({
      success: true,
      profileImage: user.profileImage,
    });
  }
);

// Admin-only route
router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

module.exports = router;
