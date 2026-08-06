const User = require("../models/User");
const OTP = require("../models/OTP");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendOtpEmail } = require("../utils/email");


const generateToken = (id, role, email) => {
  return jwt.sign(
    {
      id,
      role,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

// ================= Register =================

exports.registerUser = async (req, res) => {
  try {
     console.log("Register API Hit");
    const { name, email, password } = req.body;


    const userExists = await User.findOne({ email });

if (userExists) {
  if (userExists.isVerified) {
    return res.status(400).json({
      message: "User already exists",
    });
  }

  // Purana unverified user delete karo
  await User.deleteOne({ email });
  await OTP.deleteMany({
    email,
    action: "account_verification",
  });
}

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
      isVerified: false,
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // console.log(`OTP for ${email}: ${otp}`);

    await OTP.create({
      email,
      otp,
      action: "account_verification",
    });

  try {
  await sendOtpEmail(email, otp, "account_verification");
} catch (error) {

  await User.deleteOne({ email });

  await OTP.deleteMany({
    email,
    action: "account_verification",
  });

  return res.status(500).json({
    message: "OTP email could not be sent. Please try again.",
  });
}

return res.status(202).json({
  message:
    "User registered successfully. Please check your email for OTP verification.",
  email: user.email,
});
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

// ================= Login =================

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        error: "Invalid credentials. Please signup first.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        error: "Invalid credentials.",
      });
    }

    if (!user.isVerified && user.role === "user") {
      const otp = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      await OTP.deleteMany({
        email,
        action: "account_verification",
      });

      await OTP.create({
        email,
        otp,
        action: "account_verification",
      });
      console.log("Sending OTP...");
      
      await sendOtpEmail(email, otp, "account_verification");

      return res.status(400).json({
        error:
          "Account not verified. A new OTP has been sent to your email.",
      });
    }

    res.json({
      message: "Login successful",
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id, user.role)
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};



// veryfy otp 

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const otpRecord = await OTP.findOne({ email, otp, action: "account_verification" })

  if (!otpRecord) {
    return res.status(400).json({ error: "invalid or expired OTP" })

  }

  const user = await User.findOneAndUpdate({ email }, { isVerified: true })
  await OTP.deleteMany({ email, action: "account_verification" }) // Remove Use OTP
  res.json({
    message: "Account verified successfully. You can log in.",
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(
      user._id,
      user.role,
      user.email
    )
  })
}