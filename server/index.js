const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const { verifyEmailServer } = require("./utils/email");

const authRoutes = require("./routes/auth");
const eventRoutes = require("./routes/events");
const bookingRoutes = require("./routes/bookingRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();


// =====================
// Middleware
// =====================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://eventora-7ooa7hi86-chandan-2790.vercel.app/"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

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
  .then(async () => {

    console.log("✅ MongoDB Connected Successfully");


    // Check Email SMTP
    // await verifyEmailServer();


    const PORT = process.env.PORT || 5000;


    app.listen(PORT, () => {

      console.log(
        `🚀 Server running on port ${PORT}`
      );

    });


  })
  .catch((err) => {

    console.error(
      "❌ MongoDB Connection Failed"
    );

    console.error(err);

  });