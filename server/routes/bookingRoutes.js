const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");

const {
  bookEvent,
  sendBookingOTP,
  getMyBookings,
  getBookingById,      // 👈 Added
  confirmBooking,
  cancelBooking,
  verifyBookingOTP,
  getAllBookings,
} = require("../controllers/bookingController");

// console.log("Booking Routes Loaded");
console.log("verifyBookingOTP =>", verifyBookingOTP);

// ===================================
// Booking Routes (Protected)
// ===================================

// Create Booking
router.post("/", protect, bookEvent);

// Get All Bookings (Admin)
router.get("/", protect, admin, getAllBookings);

// Send Booking OTP
router.post("/send-otp", protect, sendBookingOTP);

// Verify Booking OTP
router.post(
  "/verify",
  protect,
  (req, res, next) => {
    // console.log("VERIFY ROUTE HIT");
    next();
  },
  verifyBookingOTP
);

// Get Logged-in User Bookings
router.get("/my", protect, getMyBookings);

// 👇 Get Single Booking Details
router.get("/:id", protect, getBookingById);

// Confirm Booking (Admin)
router.put("/:id/confirm", protect, admin, confirmBooking);

// Cancel Booking
router.delete("/:id", protect, cancelBooking);

module.exports = router;