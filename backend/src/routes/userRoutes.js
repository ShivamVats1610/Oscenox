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

// UPDATE PROFILE (name + email)
router.put("/profile", protect, async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name || user.name;
  user.email = email || user.email;

  await user.save();

  res.json({
    success: true,
    user,
  });
});

// Add Change Password Route
const bcrypt = require("bcryptjs");

router.put("/profile/password", protect, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const isMatch = await bcrypt.compare(currentPassword, user.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Current password incorrect" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ success: true, message: "Password updated successfully" });
});


// Admin-only route
router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

module.exports = router;
