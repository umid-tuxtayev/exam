const nodemailer = require('nodemailer');

module.exports = async function sendEmail(otp, email) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: 'OTP Verification',
        text: `OTP: ${otp} faqat 2 daqiqa amal qiladi`
    });
};
