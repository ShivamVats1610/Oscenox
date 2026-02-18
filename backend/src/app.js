const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const path = require("path");

/* ================= MIDDLEWARE ================= */

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);


app.use(express.json());
app.use(cookieParser());

/* ================= STATIC FILES ================= */

app.use(
  "/uploads",
  express.static(path.join(__dirname, "..", "uploads"))
);

/* ================= ROUTES ================= */

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const roomRoutes = require("./routes/roomRoutes");
const invoiceRoutes = require("./routes/invoiceRoutes");
const propertyRoutes = require("./routes/propertyRoutes");


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/invoice", invoiceRoutes);
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/properties", propertyRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/reports", require("./routes/reportRoutes"));





/* ================= HEALTH CHECK ================= */

app.get("/", (req, res) => {
  res.send("OSCENOX Backend API Running 🚀");
});

/* ================= EXPORT ================= */

module.exports = app;
