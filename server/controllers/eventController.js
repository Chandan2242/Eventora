const Event = require("../models/Event");

// ============================
// Create Event
// ============================
const createEvent = async (req, res) => {
  try {
    console.log("BODY =>", req.body);
    console.log("USER =>", req.user);

    const {
      title,
      description,
      category,
      location,
      date,
      time,
      price,
      totalSeats,
      availableSeats,
      image,
    } = req.body;

    const event = new Event({
      title,
      description,
      category,
      location,
      date,
      time,
      price,
      totalSeats,
      availableSeats,
      image,
      createdBy: req.user._id,
    });

    await event.save();

    res.status(201).json({
      success: true,
      message: "Event Created",
      data: event,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ============================
// Get All Events
// ============================
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};

// ============================
// Get Event By ID
// ============================
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch event",
      error: error.message,
    });
  }
};

// ============================
// Update Event
// ============================
const updateEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      location,
      date,
      time,
      price,
      totalSeats,
      availableSeats,
      ticketPrice,
      image,
    } = req.body;

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        category,
        location,
        date,
        time,
        price,
        totalSeats,
        availableSeats,
        ticketPrice,
        image,
      },
      {
        new: true,
      }
    );

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update event",
      error: error.message,
    });
  }
};

// ============================
// Delete Event
// ============================
const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete event",
      error: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
};   