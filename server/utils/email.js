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
});

// Verify transporter
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email Configuration Error:");
    console.error(error);
  } else {
    console.log("✅ Email Server Ready");
  }
});

// ======================
// Booking Confirmation Email
// ======================
const sendBookingEmail = async (userEmail, userName, eventTitle) => {
  try {
    const mailOptions = {
      from: `"Eventora" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Booking Confirmed - ${eventTitle}`,
      html: `
        <h2>Hello ${userName},</h2>
        <p>Your booking for <b>${eventTitle}</b> has been confirmed successfully.</p>
        <p>Thank you for choosing <b>Eventora</b>.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log("✅ Booking email sent to:", userEmail);
  } catch (error) {
    console.error("❌ Booking Email Error:");
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
        : "Use the OTP below to confirm your event booking.";

    const mailOptions = {
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
            display:inline-block;
            border-radius:8px;
          ">
            ${otp}
          </h1>

          <p>This OTP is valid for 10 minutes.</p>

          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    console.log(`✅ OTP sent successfully to ${userEmail}`);
  } catch (error) {
    console.error("❌ OTP Email Error:");
    console.error(error);

    throw error;
  }
};

module.exports = {
  sendBookingEmail,
  sendOtpEmail,
};