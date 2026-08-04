const nodemailer = require("nodemailer");
require("dotenv").config();


// ======================
// Email Transporter
// ======================

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  connectionTimeout: 15000,
  socketTimeout: 15000,
});


console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS ? "Loaded" : "Missing");

// ======================
// Test Email Connection
// ======================

// const verifyEmailServer = async () => {
//   try {
//     await transporter.verify();
//     console.log("✅ Email Server Ready");
//   } catch (error) {
//     console.log("❌ Email Server Error");
//     console.log(error);
//   }
// };


// ======================
// Send Booking Confirmation Email
// ======================

const sendBookingEmail = async (
  userEmail,
  userName,
  eventTitle
) => {

  try {

    await transporter.sendMail({

      from: `"Eventora" <${process.env.EMAIL_USER}>`,

      to: userEmail,

      subject: `Booking Confirmed - ${eventTitle}`,

      html: `
      <div style="font-family:Arial;padding:20px">

        <h2>Hello ${userName},</h2>

        <p>
          Your booking for 
          <b>${eventTitle}</b>
          has been confirmed successfully.
        </p>

        <p>
          Thank you for choosing 
          <b>Eventora</b>.
        </p>

      </div>
      `,
    });


    console.log(
      "✅ Booking Email Sent:",
      userEmail
    );


  } catch (error) {

    console.log(
      "❌ Booking Email Failed"
    );

    console.log(error);

    throw error;
  }
};



// ======================
// Send OTP Email
// ======================

const sendOtpEmail = async (
  userEmail,
  otp,
  type
) => {


  try {


    const isVerification =
      type === "account_verification";


    await transporter.sendMail({

      from:
        `"Eventora" <${process.env.EMAIL_USER}>`,


      to: userEmail,


      subject:
        isVerification
          ? "Verify Your Eventora Account"
          : "Event Booking OTP",



      html: `

      <div style="
        font-family:Arial;
        padding:20px;
        border:1px solid #ddd;
        border-radius:10px;
      ">


      <h2>
      Eventora OTP Verification
      </h2>


      <p>
      ${isVerification
          ? "Use this OTP to verify your account."
          : "Use this OTP to confirm your booking."
        }
      </p>



      <h1 style="
        letter-spacing:8px;
        color:#2563eb;
        background:#f3f4f6;
        padding:15px;
        display:inline-block;
        border-radius:8px;
      ">

      ${otp}

      </h1>



      <p>
      OTP is valid for 10 minutes.
      </p>



      <p>
      If you didn't request this OTP,
      ignore this email.
      </p>


      </div>

      `,

    });







  } catch (error) {


    console.log(
      "❌ OTP Email Failed"
    );


    console.log(
      "Message:",
      error.message
    );


    console.log(
      "Code:",
      error.code
    );


    console.log(
      "Command:",
      error.command
    );


    throw error;

  }

};



module.exports = {

  sendBookingEmail,

  sendOtpEmail,

  // verifyEmailServer

};