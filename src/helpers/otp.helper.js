module.exports = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpTime = Date.now() + 2 * 60 * 1000; 
    return { otp, otpTime };
};
