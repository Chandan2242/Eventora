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
          message:"User already exists"
        });

      }


      await User.deleteOne({ email });


      await OTP.deleteMany({
        email,
        action:"account_verification"
      });

    }



    const hashedPassword = await bcrypt.hash(
      password,
      10
    );



    const user = await User.create({

      name,

      email,

      password:hashedPassword,

      role:"user",

      isVerified:false

    });



    console.log("User Created");



    const otp = Math.floor(
      100000 + Math.random()*900000
    ).toString();



    await OTP.create({

      email,

      otp,

      action:"account_verification"

    });



    console.log("OTP Saved:",otp);



    try {


      console.log("Sending OTP Email...");


      await sendOtpEmail(
        email,
        otp,
        "account_verification"
      );


      console.log("OTP Email Sent");


    } catch(error){


      console.log(
        "OTP Email Error:",
        error.message
      );


      return res.status(500).json({

        message:"OTP email could not be sent"

      });

    }




    return res.status(200).json({

      message:"Registration successful. OTP sent to email",

      email:user.email

    });



  } catch(error){


    console.log(
      "Register Error:",
      error.message
    );


    return res.status(500).json({

      error:error.message

    });

  }

};



// ================= Login =================

exports.loginUser = async(req,res)=>{

try{


const {email,password}=req.body;


const user = await User.findOne({email});


if(!user){

return res.status(400).json({

error:"Invalid credentials"

});

}



const isMatch = await bcrypt.compare(
password,
user.password
);



if(!isMatch){

return res.status(400).json({

error:"Invalid credentials"

});

}



if(!user.isVerified && user.role==="user"){


const otp = Math.floor(
100000 + Math.random()*900000
).toString();



await OTP.deleteMany({

email,

action:"account_verification"

});



await OTP.create({

email,

otp,

action:"account_verification"

});



await sendOtpEmail(
email,
otp,
"account_verification"
);



return res.status(400).json({

error:"Account not verified. OTP sent."

});


}



res.json({

message:"Login successful",

_id:user._id,

name:user.name,

email:user.email,

role:user.role,

token:generateToken(
user._id,
user.role,
user.email
)

});


}catch(error){

res.status(500).json({

error:error.message

});

}


};




// ================= Verify OTP =================


exports.verifyOtp = async(req,res)=>{


try{


const {email,otp}=req.body;



const otpRecord = await OTP.findOne({

email,

otp,

action:"account_verification"

});



if(!otpRecord){

return res.status(400).json({

error:"Invalid or expired OTP"

});

}




const user = await User.findOneAndUpdate(

{email},

{isVerified:true},

{new:true}

);



await OTP.deleteMany({

email,

action:"account_verification"

});



res.json({

message:"Account verified successfully",

_id:user._id,

name:user.name,

email:user.email,

role:user.role,

token:generateToken(

user._id,

user.role,

user.email

)

});



}catch(error){


res.status(500).json({

error:error.message

});


}


};