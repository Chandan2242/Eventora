const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// ======================
// Email Transporter
// ======================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 15000,
  socketTimeout: 15000,
});

// Verify transporter
// transporter.verify((error) => {
//   if (error) {
//     console.error("EMAIL_USER:", process.env.EMAIL_USER);
//     console.error("EMAIL_PASS exists:", !!process.env.EMAIL_PASS);
//     console.error(error);
//   } else {
//     console.log("✅ Email Server Ready");
//   }
// });

// ======================
// Booking Confirmation Email
// ======================
const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    await transporter.sendMail({
      from: `"Eventora" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Booking Confirmed - ${eventTitle}`,
      html: `
        <h2>Hello ${userName},</h2>
        <p>Your booking for <b>${eventTitle}</b> has been confirmed successfully.</p>
        <p>Thank you for choosing <b>Eventora</b>.</p>
      `,
    });

    console.log("✅ Booking email sent:", userEmail);
  } catch (error) {
    console.error("❌ Booking Email Error");
    console.error(error);
    throw error;
  }
};

// ======================
// OTP Email
// ======================
const sendOtpEmail = async (userEmail, otp, type) => {
  try {
    const subject =
      type === "account_verification"
        ? "Verify Your Eventora Account"
        : "Event Booking OTP";

    const message =
      type === "account_verification"
        ? "Use the OTP below to verify your Eventora account."
        : "Use the OTP below to confirm your booking.";

    await transporter.sendMail({
      from: `"Eventora" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject,
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">
          <h2>Eventora OTP Verification</h2>

          <p>${message}</p>

          <h1 style="
            letter-spacing:6px;
            color:#2563eb;
            background:#f3f4f6;
            padding:15px;
            border-radius:8px;
            display:inline-block;
          ">
            ${otp}
          </h1>

          <p>This OTP is valid for 10 minutes.</p>

          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `,
    });

    console.log("✅ OTP sent:", userEmail);
  } catch (error) {
    console.error("❌ OTP Email Error");
    console.error(error);
    console.error("Code:", error.code);
    console.error("Command:", error.command);
    throw error;
  }
};

module.exports = {
  sendBookingEmail,
  sendOtpEmail,
};