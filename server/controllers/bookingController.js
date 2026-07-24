const Booking = require("../models/booking");
const Event = require("../models/Event");
const User = require("../models/User");
const OTP = require("../models/OTP");

const {
  sendOtpEmail,
  sendBookingEmail,
} = require("../utils/email");

console.log("Booking Controller Loaded");

// ===============================
// Generate OTP
// ===============================
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ===================================
// Book Event
// ===================================
const bookEvent = async (req, res) => {
  try {
    const { eventId, numberOfTickets, amount } = req.body;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Seat Check
    if (event.availableSeats < numberOfTickets) {
      return res.status(400).json({
        success: false,
        message: `Only ${event.availableSeats} seats available.`,
      });
    }

    // Reserve Seats
    event.availableSeats -= numberOfTickets;
    await event.save();

    // Generate OTP
    const otp = generateOtp();

    await OTP.deleteMany({
      email: req.user.email,
      action: "event_booking",
    });

    await OTP.create({
      email: req.user.email,
      otp,
      action: "event_booking",
    });

    await sendOtpEmail(
      req.user.email,
      otp,
      "event_booking"
    );

    const booking = await Booking.create({
      userId: req.user._id,
      eventId,
      numberOfTickets,
      amount,
      status: "pending",
      paymentStatus: "Pending",
    });

    res.status(201).json({
      success: true,
      message: "Booking created successfully. OTP sent to email.",
      data: booking,
      availableSeats: event.availableSeats,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// ===================================
// Send Booking OTP Again
// ===================================
const sendBookingOTP = async (req,res)=>{

const otp=generateOtp();

await OTP.deleteMany({

email:req.user.email,

action:"event_booking"

});

await OTP.create({

email:req.user.email,

otp,

action:"event_booking"

});

await sendOtpEmail(

req.user.email,

otp,

"event_booking"

);

res.json({

success:true,

message:"OTP Sent"

});

}


// ==============================
// Verify OTP + Create Booking
// ==============================
const verifyBookingOTP = async (req, res) => {
  console.log("VERIFY BOOKING CONTROLLER STARTED");
  console.log("BODY =>", req.body);
  try {
    console.log("===== VERIFY BOOKING OTP =====");
    console.log("BODY =>", req.body);
    console.log("USER =>", req.user);

    const { eventId, otp, numberOfTickets = 1 } = req.body;

    if (!eventId) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required",
      });
    }

    // Check OTP
    const otpRecord = await OTP.findOne({
      email: req.user.email,
      otp,
      action: "event_booking",
    });

    console.log("OTP RECORD =>", otpRecord);

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Find Event
    const event = await Event.findById(eventId);

    console.log("EVENT =>", event);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    // Seat Check
    if (event.availableSeats < numberOfTickets) {
      return res.status(400).json({
        success: false,
        message: `Only ${event.availableSeats} seats available`,
      });
    }

    // Update Seats
    event.availableSeats -= numberOfTickets;
    await event.save();

    // Create Booking
    const booking = await Booking.create({
      userId: req.user._id,
      eventId: event._id,
      numberOfTickets,
      amount: event.price * numberOfTickets,
      status: "pending",
      paymentStatus: "Pending",
    });

    // Delete Used OTP
    await OTP.deleteMany({
      email: req.user.email,
      action: "event_booking",
    });

    res.status(200).json({
      success: true,
      message: "Booking Successful",
      data: booking,
      availableSeats: event.availableSeats,
    });

  } catch (err) {
    console.error("VERIFY BOOKING ERROR =>", err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ===================================
// Get My Bookings
// ===================================
const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      userId: req.user.id,
    })
      .populate("eventId")
      .populate("userId", "-password")
      .sort({ createdAt: -1 }); // Latest booking first

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ===================================
// Confirm Booking (Admin)
// ===================================
const confirmBooking = async (req, res) => {
  try {

    const booking = await Booking.findById(req.params.id);
    console.log("UPDATED BOOKING =>", booking);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    const { paymentStatus } = req.body;

    booking.paymentStatus =
      paymentStatus === "paid" ? "Paid" : "Pending";

    booking.status = "confirmed";

    await booking.save();

    const user = await User.findById(booking.userId);
    const event = await Event.findById(booking.eventId);

    if (user && event) {
      await sendBookingEmail(
        user.email,
        user.name,
        event.title
      );
    }

    res.json({
      success: true,
      message: "Booking confirmed successfully.",
      data: booking,
    });

  } catch (err) {
    res.status(500).json({
      success:false,
      message:err.message
    });
  }
};

// get all bookings ===========

const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("eventId")
      .populate("userId", "-password")
      .sort({ createdAt: -1 }); // Latest booking first

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===================================
// Get Single Booking
// ===================================
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("eventId")
      .populate("userId", "-password");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    // Sirf apni booking ya admin hi dekh sakta hai
    if (
      booking.userId._id.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



// ===================================
// Cancel Booking
// ===================================
const cancelBooking = async (req, res) => {

  try {

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    if (booking.status === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking already cancelled.",
      });
    }

    const event = await Event.findById(booking.eventId);

    if (event) {
      event.availableSeats += booking.numberOfTickets;
      await event.save();
    }

    booking.status = "cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking cancelled successfully.",
      availableSeats: event.availableSeats,
      data: booking,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  bookEvent,
  sendBookingOTP,
  verifyBookingOTP ,
  getMyBookings,
  getBookingById,
  getAllBookings,
  confirmBooking,
  cancelBooking,
};