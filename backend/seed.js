const mongoose = require("mongoose");
require("dotenv").config();

const Property = require("./src/models/Property");
const Room = require("./src/models/Room");

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

async function seed() {
  try {
    await Property.deleteMany();
    await Room.deleteMany();

    // Create Properties
    const swiss = await Property.create({
      name: "Swiss Cottage",
      slug: "swiss",
      location: "Rishikesh",
      description: "Luxury riverside stay",
    });

    const bunk = await Property.create({
      name: "Bunk Stay",
      slug: "bunk",
      location: "Rishikesh",
      description: "Affordable social stays",
    });

    // Create Rooms
    await Room.create([
      {
        property: swiss._id,
        title: "Deluxe Room",
        description: "Elegant and spacious room with balcony.",
        pricePerNight: 4000,
        capacity: 2,
        amenities: ["WiFi", "AC", "Balcony"],
        images: ["/uploads/swiss/deluxe1.jpg"],
      },
      {
        property: bunk._id,
        title: "Dormitory Bed",
        description: "Shared bunk bed for backpackers.",
        pricePerNight: 800,
        capacity: 1,
        amenities: ["WiFi", "Locker", "Common Lounge"],
        images: ["/uploads/bunk/dorm1.jpg"],
      },
    ]);

    console.log("✅ Data Seeded Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

seed();
