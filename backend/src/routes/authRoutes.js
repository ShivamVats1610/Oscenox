const express = require("express");
const router = express.Router();
const { signup, login, logout, firebaseSession } = require("../controllers/authController");

router.post("/firebase-session", firebaseSession);

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

module.exports = router;
