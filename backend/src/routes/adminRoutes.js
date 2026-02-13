const router = require("express").Router();
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");

router.get("/dashboard", protect, allowRoles("admin"), (req, res) => {
  res.json({ message: "Welcome Admin Dashboard" });
});

module.exports = router;
