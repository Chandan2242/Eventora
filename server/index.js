const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// =====================
// Middleware
// =====================
app.use(cors());
app.use(express.json());

// =====================
// Test Route
// =====================
app.get("/", (req, res) => {
  res.status(200).send("Eventora Server is Running...");
});

// =====================
// API Routes
// =====================
console.log("Registering Auth Routes...");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/user", dashboardRoutes);

// =====================
// MongoDB Connection
// =====================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    const PORT = process.env.PORT || 5000;
    const server = app.listen(PORT, "127.0.0.1", () => {
      console.log(`Listening on ${server.address().address}:${server.address().port}`);
      console.log(process.env.PORT);
      console.log(typeof process.env.PORT);
    });

    server.on("error", (err) => {
      console.error("Listen Error:", err);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed");
    console.error(err);
  });