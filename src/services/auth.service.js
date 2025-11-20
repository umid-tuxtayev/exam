const userService = require("./user.service");
const otpHelper = require("../helpers/otp.helper");
const emailHelper = require("../helpers/email.helper");
const bcryptUtils = require("../utils/bcrypt.utils");
const { ClientError } = require("shokhijakhon-error-handler");
const { createAccessToken, createRefreshToken } = require("../helpers/token.helper");
const logger = require("../config/winston");
const tokenHelper = require("../helpers/token.helper");

module.exports = {

    async register(data) {
        const { otp, otpTime } = otpHelper();
        const hashed = await bcryptUtils.hashPassword(data.password);
        const userData = { ...data, password: hashed, otp, otpTime };

        await emailHelper(otp, data.email);
        return userService.createUser(userData);
    },

    async verifyEmail(email, otp) {
        const user = await userService.findUserByEmail(email);
        if (!user) throw new ClientError("User not found", 404);

        if (user.otp !== otp) throw new ClientError("Invalid OTP", 400);

        if (Date.now() > user.otpTime) {
            await userService.updateUser(email, { otp: null });
            throw new ClientError("OTP expired", 400);
        }

        return userService.updateUser(email, { isVerified: true, otp: null });
    },

    async resendOtp(email) {
        const user = await userService.findUserByEmail(email);
        if (!user) throw new ClientError("User not found", 404);

        const { otp, otpTime } = otpHelper();
        await emailHelper(otp, email);
        return userService.updateUser(email, { otp, otpTime });
    },

    async forgetPassword(email) {
        const user = await userService.findUserByEmail(email);
        if (!user) throw new ClientError("User not found", 404);

        const { otp, otpTime } = otpHelper();
        await userService.updateUser(email, { otp, otpTime, isVerified: false });
        await emailHelper(otp, email);

        return true;
    },

    async changePassword(email, otp, newPassword) {
        const user = await userService.findUserByEmail(email);
        if (!user) throw new ClientError("User not found", 404);

        if (user.otp !== otp) throw new ClientError("Invalid OTP", 400);
        if (Date.now() > user.otpTime) {
            await userService.updateUser(email, { otp: null });
            throw new ClientError("OTP expired", 400);
        }

        const hashed = await bcryptUtils.hashPassword(newPassword);
        return userService.updateUser(email, { password: hashed, otp: null, isVerified: true });
    },

    async login(data, userAgent) {
        const user = await userService.findUserByEmail(data.email);
        if (!user) throw new ClientError("User not found", 404);
        let password = await bcryptUtils.comparePassword(data.password, user.password);
        if (!password) throw new ClientError('User not found', 404);
        if (user.isVerified === false) {
            logger.warn(`User not verifid`);
            throw new ClientError('User not virification', 400)
        }
        let payload = { id: user._id, userAgent, role: user.role };
        let accessToken = createAccessToken(payload);
        let refreshToken = createRefreshToken(payload);
        user.refreshTokens.push({
            token: refreshToken,
            role: user.role,
            userAgent,
            expiresAt: Date.now() + (7 * 24 * 60 * 60 * 1000),
            sessionExpires: Date.now() + (30 * 24 * 60 * 60 * 1000),
        });
        await user.save();
        return { accessToken, refreshToken }
    },

    async refresh(req) {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) throw new ClientError('Token missing', 401);

        const decode = tokenHelper.verifyRefreshToken(refreshToken);
        const user = await userService.findByUserId(decode.id);
        if (!user) throw new ClientError('Token invalid', 401);

        const storedToken = user.refreshTokens.find(rt => rt.token === refreshToken);
        if (!storedToken) throw new ClientError('Token invalid or userAgent mismatch', 401);

        if (storedToken.userAgent !== decode.userAgent) throw new ClientError('UserAgent mismatch', 401);
        if (storedToken.sessionExpires < Date.now()) throw new ClientError('Token expired, please login again', 401);

        const payload = { id: user._id, userAgent: decode.userAgent, role: user.role };

        const accessToken = tokenHelper.createAccessToken(payload);

        const newRefreshToken = tokenHelper.createRefreshToken(payload);
        user.refreshTokens = user.refreshTokens.filter(rt => rt.token !== refreshToken);
        user.refreshTokens.push({
            token: newRefreshToken,
            userAgent: decode.userAgent,
            expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000,
            sessionExpires: storedToken.sessionExpires
        });
        await user.save();

        return { accessToken, newRefreshToken };
    },

    async logout(token) {
        logger.debug(`refresh token ${token}`);
        if (!token) {
            logger.info(`LOGOUT: token not found`);
            throw new ClientError('Token not provided', 401);
        }

        const parsed = tokenHelper.verifyRefreshToken(token);
        if (!parsed) throw new ClientError("Invalid token", 401);

        const user = await userService.findByUserId(parsed.id);
        if (!user) throw new ClientError('Token invalid', 401);

        await userService.deleteRefreshToken(parsed.id, token);
    }

};
