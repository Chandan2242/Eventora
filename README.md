# 🎉 Eventora - Event Management System

Eventora is a full-stack Event Management System built using the MERN Stack. It allows users to discover events, book tickets, receive OTP verification, and manage bookings. Administrators can create, update, delete, and confirm event bookings.

---

## 🚀 Features

### User

- User Registration
- Login with JWT Authentication
- Email OTP Verification
- View Events
- Book Events
- Booking History
- Cancel Booking

### Admin

- Create Events
- Update Events
- Delete Events
- Confirm Bookings
- Manage Available Seats

### Booking

- Seat Availability Check
- OTP Verification
- Email Notifications
- Booking Confirmation
- Automatic Seat Updates
- Payment Status Tracking

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer

---

# 📁 Project Structure

```
EVENTORA
│
├── client
│
└── server
    ├── controllers
    ├── middleware
    ├── models
    ├── routes
    ├── utils
    ├── .env
    ├── package.json
    └── index.js
```

---

# ⚙ Installation

Clone Repository

```bash
git clone <repository-url>

cd EVENTORA
```

Install Backend

```bash
cd server

npm install
```

Install Frontend

```bash
cd client

npm install
```

---

# ▶ Run Project

Backend

```bash
cd server

npm run dev
```

Frontend

```bash
cd client

npm start
```

---

# 🔑 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGODB_URI=mongodb://127.0.0.1:27017/eventora

JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password
```

---

# 📡 API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`
- POST `/api/auth/verify-otp`

### Events

- GET `/api/events`
- GET `/api/events/:id`
- POST `/api/events`
- PUT `/api/events/:id`
- DELETE `/api/events/:id`

### Booking

- POST `/api/bookings`
- GET `/api/bookings/my`
- PUT `/api/bookings/:id/confirm`
- DELETE `/api/bookings/:id`

---

# 📌 Future Improvements

- Razorpay Integration
- Stripe Payment
- QR Code Ticket
- Event Reviews
- Event Search
- Cloudinary Image Upload
- Dashboard Analytics
- Forgot Password
- Google Login
- Ticket PDF Download

---

# 👨‍💻 Author

**Chandan Prajapati**

MERN Stack Developer

University of Lucknow

---

# 📄 License

This project is developed for educational and portfolio purposes.