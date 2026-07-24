require("dotenv").config();

const mongoose = require("mongoose");

const Event = require("./models/Event");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log(err));

const events = [
  {
    title: "React Bootcamp",
    description: "Learn React.js from beginner to advanced.",
    category: "Technology",
    location: "Lucknow",
    date: new Date("2026-08-15"),
    time: "10:00 AM",
    price: 499,
    totalSeats: 100,
    availableSeats: 100,
    ticketPrice: 499,
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    createdBy: new mongoose.Types.ObjectId(),
  },

  {
    title: "Node.js Workshop",
    description: "Master Backend Development using Node.js.",
    category: "Workshop",
    location: "Delhi",
    date: new Date("2026-08-20"),
    time: "11:00 AM",
    price: 799,
    totalSeats: 150,
    availableSeats: 150,
    ticketPrice: 799,
    image:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    createdBy: new mongoose.Types.ObjectId(),
  },

  {
    title: "AI Conference",
    description: "Latest trends in Artificial Intelligence.",
    category: "Conference",
    location: "Bangalore",
    date: new Date("2026-09-05"),
    time: "09:30 AM",
    price: 1499,
    totalSeats: 300,
    availableSeats: 300,
    ticketPrice: 1499,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
    createdBy: new mongoose.Types.ObjectId(),
  },

  {
    title: "Music Festival",
    description: "Enjoy live music performances.",
    category: "Music",
    location: "Mumbai",
    date: new Date("2026-09-10"),
    time: "06:00 PM",
    price: 999,
    totalSeats: 500,
    availableSeats: 500,
    ticketPrice: 999,
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    createdBy: new mongoose.Types.ObjectId(),
  },

  {
    title: "Startup Meetup",
    description: "Meet founders and investors.",
    category: "Business",
    location: "Noida",
    date: new Date("2026-09-25"),
    time: "02:00 PM",
    price: 299,
    totalSeats: 200,
    availableSeats: 200,
    ticketPrice: 299,
    image:
      "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    createdBy: new mongoose.Types.ObjectId(),
  }
];

const seedDB = async () => {
  try {
    await Event.deleteMany();

    await Event.insertMany(events);

    console.log("✅ Dummy Events Inserted Successfully");

    process.exit();

  } catch (error) {

    console.log(error);

    process.exit(1);
  }
};

seedDB();