const nodemailer = require("nodemailer");


const dotenv = require('dotenv');
// const { text } = require("figlet");

dotenv.config();

const transporter = nodemailer.createTransport({    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,

    }

})

const sendBookingEmail = async(userEmail , userName, eventTitle)=>{
    try{
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: `booking confirmed: ${eventTitle}`,
            text:  `your booking for the envent ${eventTitle} is successfully confirmed. </br> ThankYou for choosing Eventorea`
        };
        await transporter.sendMail(mailOptions);
        console.log("Email send successfully to ",userEmail);


        
    } catch(error){
        console.log("Error to sending email" ,error)

    }
}


const sendOtpEmail = async (userEmail, otp, type) => {
    try {
        const title = type === 'account_verification' ? "verify your Eventora Account": "Eventorea Booking verifiction";
        const  msg = type === 'account_verification' 
        ?'please use the following otp for your new eventora account.'
        :"please use the following otp to verify and confirm your event booking.";


        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail,
            subject: "your Otp code",
            text: `your otp code is ${otp}`
        }
        await transporter.sendMail(mailOptions);
        console.log(`OTP send to email ${userEmail} for ${type}`)
    } catch (error) {
        console.error(`Error sending OTP email:`, error)
    }


}
module.exports = {
    sendBookingEmail,
    sendOtpEmail,
};