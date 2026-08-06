const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

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
// CORS Configuration
// =====================

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://eventora-pink.vercel.app",
  "https://eventora-7ooa7hi86-chandan-2790.vercel.app"
];


app.use(
  cors({
    origin: (origin, callback) => {

      // Allow Postman, mobile apps, server requests
      if (!origin) {
        return callback(null, true);
      }


      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }


      return callback(
        new Error("CORS blocked")
      );

    },

    credentials:true,

    methods:[
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH"
    ],

    allowedHeaders:[
      "Content-Type",
      "Authorization"
    ]

  })
);



app.use(express.json());



// =====================
// Health Check
// =====================

app.get("/", (req,res)=>{

    res.status(200).json({

        success:true,

        message:"Eventora Server is Running..."

    });

});




// =====================
// Routes
// =====================


console.log("Registering Auth Routes...");


app.use(
    "/api/auth",
    authRoutes
);


app.use(
    "/api/events",
    eventRoutes
);


app.use(
    "/api/bookings",
    bookingRoutes
);


app.use(
    "/api/user",
    dashboardRoutes
);





// =====================
// MongoDB Connection
// =====================


mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{


    console.log(
        "✅ MongoDB Connected Successfully"
    );


    const PORT = process.env.PORT || 5000;


    app.listen(PORT,()=>{

        console.log(
            `🚀 Server running on port ${PORT}`
        );

    });


})
.catch((error)=>{


    console.log(
        "❌ MongoDB Connection Failed"
    );


    console.log(error.message);


});