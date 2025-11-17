const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/verify/otp', authController.verify);
authRouter.post('/resend/otp', authController.resendOtp);
authRouter.post('/forget/password', authController.forgetPassword);
authRouter.post('/change/password', authController.changePassword);
authRouter.post('/refresh/token', authController.refresh);
authRouter.post('/logout', authController.logout);



module.exports = authRouter;