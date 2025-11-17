const authService = require("../services/auth.service");
const { globalError } = require("shokhijakhon-error-handler");
const logger = require("../config/winston");

module.exports = {

    async register(req, res) {
        try {
            logger.debug(`REGISTER REQUEST: ${req.body.email}`);
            await authService.register(req.body);
            logger.info(`REGISTER SUCCESS: ${req.body.email}`);
            return res.status(201).json({ message: "User registered successfully", status: 201 });
        } catch (err) {
            logger.error(`REGISTER ERROR: ${err.message}`);
            return globalError(err, res);
        }
    },

    async verify(req, res) {
        try {
            const { email, otp } = req.body;
            logger.debug(`VERIFY REQUEST: ${email}`);
            await authService.verifyEmail(email, otp);
            logger.info(`VERIFY SUCCESS: ${email}`);
            return res.json({ message: "User verified successfully", status: 200 });
        } catch (err) {
            logger.error(`VERIFY ERROR: ${err.message}`);
            return globalError(err, res);
        }
    },

    async resendOtp(req, res) {
        try {
            const { email } = req.body;
            logger.debug(`RESEND_OTP REQUEST: ${email}`);
            await authService.resendOtp(email);
            logger.info(`RESEND_OTP SUCCESS: ${email}`);
            return res.json({ message: "OTP resent successfully", status: 200 });
        } catch (err) {
            logger.error(`RESEND_OTP ERROR: ${err.message}`);
            return globalError(err, res);
        }
    },

    async forgetPassword(req, res) {
        try {
            const { email } = req.body;
            logger.debug(`FORGET_PASSWORD REQUEST: ${email}`);
            await authService.forgetPassword(email);
            logger.info(`FORGET_PASSWORD SUCCESS: ${email}`);
            return res.json({ message: "OTP sent for password reset", status: 200 });
        } catch (err) {
            logger.error(`FORGET_PASSWORD ERROR: ${err.message}`);
            return globalError(err, res);
        }
    },

    async changePassword(req, res) {
        try {
            const { email, otp, newPassword } = req.body;
            logger.debug(`CHANGE_PASSWORD REQUEST: ${email}`);
            await authService.changePassword(email, otp, newPassword);
            logger.info(`CHANGE_PASSWORD SUCCESS: ${email}`);
            return res.json({ message: "Password changed successfully", status: 200 });
        } catch (err) {
            logger.error(`CHANGE_PASSWORD ERROR: ${err.message}`);
            return globalError(err, res);
        }
    },

    async login(req, res) {
        try {
            const data = req.body;
            logger.debug(`LOGIN REQUEST: ${data.email}`);
            let { accessToken, refreshToken } = await authService.login(data, req.headers['user-agent']);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
            });

            logger.info(`LOGIN SUCCESS: ${req.body.email}`);
            res.json({ message: 'User logein successfully', accessToken, status: 200 });
        } catch (error) {
            logger.error(`LOGIN ERROR: ${error.message}`);
            return globalError(error, res)
        }
    },

    async refresh(req, res) {
        try {
            const { accessToken, newRefreshToken } = await authService.refresh(req);

            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                sameSite: 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            logger.info(`REFRESH SUCCESS: ${req.cookies.refreshToken}`);
            res.json({ message: 'Token refreshed successfully', accessToken, status: 200 });
        } catch (error) {
            logger.error(`REFRESH ERROR: ${error.message}`);
            return globalError(error, res);
        }
    },

    async logout(req, res) {
        try {
            logger.debug(`LOGOUT REQUEST`);
            const token = req.cookies.refreshToken;

            if (!token) {
                logger.warn('LOGOUT: no refresh token in cookies');
                return res.status(401).json({ message: 'Not logged in' });
            }

            await authService.logout(token);
            res.clearCookie("refreshToken");
            logger.info(`LOGOUT SUCCESS`);
            res.json({ message: "Logged out" });
        } catch (error) {
            logger.error(`LOGOUT ERROR: ${error.message}`);
            return globalError(error, res);
        }
    }
};
