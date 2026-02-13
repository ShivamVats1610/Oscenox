// routes/propertyRoutes.js

const express = require("express");
const Property = require("../models/Property");
const router = express.Router();

// GET ALL PROPERTIES
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
