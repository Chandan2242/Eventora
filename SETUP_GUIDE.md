# Eventora - Setup Guide

## Project Overview

Eventora is a full-stack Event Management System built using the MERN Stack.

### Features

- User Registration & Login
- JWT Authentication
- Email OTP Verification
- Role-based Authentication (Admin/User)
- Event Management
- Event Booking
- Booking Confirmation
- Email Notifications
- MongoDB Database
- REST APIs

---

# Tech Stack

## Frontend

- React.js
- Axios
- React Router DOM

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer

---

# Project Structure

```
EVENTORA
│
├── client/
│
└── server/
    │
    ├── controllers/
    │     ├── authController.js
    │     ├── bookingController.js
    │     └── eventController.js
    │
    ├── middleware/
    │     └── auth.js
    │
    ├── models/
    │     ├── User.js
    │     ├── Event.js
    │     ├── Booking.js
    │     └── OTP.js
    │
    ├── routes/
    │     ├── auth.js
    │     ├── bookingRoutes.js
    │     ├── events.js
    │     └── dashboardRoutes.js
    │
    ├── utils/
    │     └── email.js
    │
    ├── .env
    ├── package.json
    └── index.js
```

---

# Prerequisites

Install the following software before running the project.

- Node.js (v18+ recommended)
- npm
- MongoDB Community Server OR MongoDB Atlas
- Git
- VS Code

---

# Clone Repository

```bash
git clone <repository-url>

cd EVENTORA
```

---

# Install Dependencies

## Backend

```bash
cd server

npm install
```

## Frontend

```bash
cd client

npm install
```

---

# Environment Variables

Create a file named

```
.env
```

inside

```
server
```

Add the following variables.

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/eventora

JWT_SECRET=your_super_secret_key

EMAIL_USER=yourgmail@gmail.com

EMAIL_PASS=your_app_password
```

---

# Gmail Setup

Enable

- Two Factor Authentication

Generate

- App Password

Use the generated password as

```
EMAIL_PASS
```

Do NOT use your Gmail login password.

---

# MongoDB Setup

Start MongoDB locally.

Windows

```bash
mongod
```

OR

Start MongoDB Compass.

Connection String

```
mongodb://127.0.0.1:27017/eventora
```

---

# Start Backend

```bash
cd server

npm start
```

or

```bash
npm run dev
```

Expected Output

```
MongoDB Connected Successfully

Server running on port 5000
```

---

# Start Frontend

```bash
cd client

npm start
```

React runs on

```
http://localhost:3000
```

---

# Authentication Flow

## Register

```
POST

/api/auth/register
```

↓

User Created

↓

OTP Sent to Email

↓

Verify OTP

↓

Account Activated

↓

Login

↓

JWT Token Generated

↓

Protected Routes Accessible

---

# Event Flow

Admin

↓

Create Event

↓

Save in MongoDB

↓

Users View Events

↓

Book Event

↓

OTP Sent

↓

Payment

↓

Booking Confirmed

↓

Confirmation Email Sent

---

# Booking Flow

User Books Event

↓

Seat Availability Checked

↓

Available Seats Reduced

↓

Booking Status

Pending

↓

Payment Completed

↓

Admin Confirms Booking

↓

Status

Confirmed

↓

Confirmation Email Sent

↓

If Cancelled

↓

Seats Automatically Increased

---

# API Endpoints

## Authentication

Register

```
POST /api/auth/register
```

Login

```
POST /api/auth/login
```

Verify OTP

```
POST /api/auth/verify-otp
```

---

## Events

Get All Events

```
GET /api/events
```

Get Event By Id

```
GET /api/events/:id
```

Create Event

```
POST /api/events
```

Update Event

```
PUT /api/events/:id
```

Delete Event

```
DELETE /api/events/:id
```

---

## Booking

Book Event

```
POST /api/bookings
```

Send Booking OTP

```
POST /api/bookings/send-otp
```

My Bookings

```
GET /api/bookings/my
```

Confirm Booking

```
PUT /api/bookings/:id/confirm
```

Cancel Booking

```
DELETE /api/bookings/:id
```

---

# Authentication Header

Every protected route requires

```
Authorization

Bearer YOUR_JWT_TOKEN
```

Example

```
Authorization:
Bearer eyJhbGc....
```

---

# Database Collections

```
Users

Events

Bookings

OTPs
```

---

# Default Booking Status

```
Pending
```

---

# Payment Status

```
Pending

Paid
```

---

# User Roles

```
User

Admin
```

---

# Common Errors

## JWT Error

```
Invalid Token
```

Solution

Check

```
JWT_SECRET
```

---

## MongoDB Error

```
ECONNREFUSED
```

Solution

Start MongoDB Server.

---

## Email Error

```
Invalid Login
```

Solution

Use Gmail App Password.

---

## Port Error

```
EACCES
```

Check

```
PORT=5000
```

There should NOT be

```
PORT=5000;
```

---

# Deployment

## Backend

- Render
- Railway

## Frontend

- Vercel
- Netlify

## Database

- MongoDB Atlas

---

# Future Improvements

- Razorpay Integration
- Stripe Integration
- Seat Selection UI
- QR Code Ticket
- Event Analytics Dashboard
- Admin Dashboard
- Ticket PDF Generation
- Search & Filter
- Notifications
- Wishlist
- Reviews & Ratings
- Google OAuth Login
- Forgot Password
- Refresh Token Authentication
- Cloudinary Image Upload
- Pagination
- Event Categories
- Booking History
- Payment History

---

# Author

**Chandan Prajapati**

MERN Stack Developer

University of Lucknow

---

# License

This project is created for learning and portfolio purposes.