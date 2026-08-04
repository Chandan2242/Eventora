const express = require("express");
const router = express.Router();

const { protect, admin } = require("../middleware/auth");

const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");

// =============================
// Public Routes
// =============================

// Get all events
router.get("/", getAllEvents);

// Get single event
router.get("/:id", getEventById);

// router.post("/", protect, admin, createEvent);


// =============================
// Admin Routes
// =============================

// Create Event Admin onely
router.post("/", protect, admin, createEvent);

// Update Event Admin onely
router.put("/:id", protect, admin, updateEvent);

// Delete Event Admin onely
router.delete("/:id", protect, admin, deleteEvent);

module.exports = router;