const { Router } = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validate');
const authValidator = require('../utils/auth.validator');
const authRouter = Router();

authRouter.post('/register', validate(authValidator.register), authController.register);
authRouter.post('/login', validate(authValidator.login), authController.login);
authRouter.post('/verify/otp', validate(authValidator.verify), authController.verify);
authRouter.post('/resend/otp', validate(authValidator.resendOtp), authController.resendOtp);
authRouter.post('/forget/password', validate(authValidator.forgetPassword), authController.forgetPassword);
authRouter.post('/change/password', validate(authValidator.changePassword), authController.changePassword);
authRouter.post('/refresh/token', authController.refresh);
authRouter.post('/logout', authController.logout);



module.exports = authRouter;