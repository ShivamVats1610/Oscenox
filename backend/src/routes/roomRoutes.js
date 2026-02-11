const express = require("express");
const Room = require("../models/Room");
const Property = require("../models/Property");

const router = express.Router();

// Get all rooms (optional property filter)
router.get("/", async (req, res) => {
  try {
    const { property } = req.query;

    let filter = {};

    if (property) {
      const prop = await Property.findOne({ slug: property });
      if (!prop) return res.status(404).json({ message: "Property not found" });
      filter.property = prop._id;
    }

    const rooms = await Room.find(filter).populate("property");

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get single room
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId)
      .populate("property");

    if (!room) return res.status(404).json({ message: "Room not found" });

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
