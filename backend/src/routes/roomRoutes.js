const express = require("express");
const Room = require("../models/Room");
const Property = require("../models/Property");
const protect = require("../middleware/authMiddleware");
const allowRoles = require("../middleware/roleMiddleware");
const upload = require("../middleware/uploadRoomImages");

const router = express.Router();

/* ===================================================
   PUBLIC — GET ALL ROOMS (ONLY ACTIVE)
=================================================== */
router.get("/", async (req, res) => {
  try {
    const { property } = req.query;

    let filter = { isDeleted: false };

    if (property) {
      const prop = await Property.findOne({ slug: property });
      if (!prop)
        return res.status(404).json({ message: "Property not found" });

      filter.property = prop._id;
    }

    const rooms = await Room.find(filter)
      .populate("property", "name location")
      .sort({ createdAt: -1 });

    res.json(rooms);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   PUBLIC — GET SINGLE ROOM (ONLY IF ACTIVE)
=================================================== */
router.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findOne({
      _id: req.params.roomId,
      isDeleted: false,
    }).populate("property", "name location");

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    res.json(room);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ===================================================
   ADMIN — GET ALL ROOMS
   Optional: ?archived=true to see archived
=================================================== */
router.get(
  "/admin/all",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const { archived } = req.query;

      const filter =
        archived === "true"
          ? { isDeleted: true }
          : { isDeleted: false };

      const rooms = await Room.find(filter)
        .populate("property", "name location")
        .sort({ createdAt: -1 });

      res.json(rooms);
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

/* ===================================================
   ADMIN — CREATE ROOM
=================================================== */
router.post(
  "/admin/create",
  protect,
  allowRoles("admin"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      const {
        property,
        title,
        description,
        pricePerNight,
        capacity,
        amenities,
      } = req.body;

      const imagePaths = req.files
        ? req.files.map(
            (file) => `/uploads/rooms/${file.filename}`
          )
        : [];

      const newRoom = await Room.create({
        property,
        title,
        description,
        pricePerNight,
        capacity,
        amenities: JSON.parse(amenities),
        images: imagePaths,
      });

      res.status(201).json({ success: true, room: newRoom });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Room creation failed" });
    }
  }
);

/* ===================================================
   ADMIN — UPDATE ROOM
=================================================== */
router.put(
  "/admin/:roomId",
  protect,
  allowRoles("admin"),
  upload.array("images", 5),
  async (req, res) => {
    try {
      const room = await Room.findById(req.params.roomId);
      if (!room)
        return res.status(404).json({ message: "Room not found" });

      const {
        title,
        description,
        pricePerNight,
        capacity,
        amenities,
        existingImages,
      } = req.body;

      let updatedImages = existingImages
        ? JSON.parse(existingImages)
        : [];

      if (req.files && req.files.length > 0) {
        const newImages = req.files.map(
          (file) => `/uploads/rooms/${file.filename}`
        );
        updatedImages = [...updatedImages, ...newImages];
      }

      room.title = title;
      room.description = description;
      room.pricePerNight = pricePerNight;
      room.capacity = capacity;
      room.amenities = JSON.parse(amenities);
      room.images = updatedImages;

      await room.save();

      res.json({ success: true, room });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Update failed" });
    }
  }
);

/* ===================================================
   ADMIN — ARCHIVE ROOM (SOFT DELETE)
=================================================== */
router.delete(
  "/admin/:roomId",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const room = await Room.findById(req.params.roomId);

      if (!room)
        return res.status(404).json({ message: "Room not found" });

      room.isDeleted = true;
      await room.save();

      res.json({
        success: true,
        message: "Room archived successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Archive failed" });
    }
  }
);

/* ===================================================
   ADMIN — RESTORE ROOM
=================================================== */
router.put(
  "/admin/restore/:roomId",
  protect,
  allowRoles("admin"),
  async (req, res) => {
    try {
      const room = await Room.findById(req.params.roomId);

      if (!room)
        return res.status(404).json({ message: "Room not found" });

      room.isDeleted = false;
      await room.save();

      res.json({
        success: true,
        message: "Room restored successfully",
      });
    } catch (error) {
      res.status(500).json({ message: "Restore failed" });
    }
  }
);

module.exports = router;
