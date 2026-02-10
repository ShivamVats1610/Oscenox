const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

// Normal protected route
router.get("/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

// Admin-only route
router.get("/admin", protect, allowRoles("admin"), (req, res) => {
  res.json({
    success: true,
    message: "Welcome Admin",
  });
});

module.exports = router;
