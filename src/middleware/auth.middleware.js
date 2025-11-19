const { globalError, ClientError } = require("shokhijakhon-error-handler")
const logger = require("../config/winston");
const tokenHelper = require("../helpers/token.helper");
const userService = require("../services/user.service");

module.exports = async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader) {
            logger.info("AUTH: No authorization header");
            throw new ClientError("Authorization header missing", 401);
        };

        const [scheme, token] = authHeader.split(" ");

        if (scheme !== "Bearer" || !token) {
            logger.warn(`AUTH: Invalid scheme or token format: ${authHeader}`);
            throw new ClientError("Invalid authorization format", 401);
        }

        const decode = tokenHelper.verifyAccessToken(token);
        if (!decode) {
            logger.warn("AUTH: Invalid or expired access token");
            throw new ClientError("Access token invalid or expired", 403);
        }

        const user = await userService.findByUserId(decode.id);
        if (!user) {
            logger.warn("AUTH: User not found");
            throw new ClientError("User no longer exists", 401);
        };

        const sessionValid = user.refreshTokens.some(rt => rt.sessionExpires > Date.now());
        if (!sessionValid) {
            logger.warn("AUTH: Session expired");
            throw new ClientError('Session expired, please login again', 401)
        }

        if (decode.userAgent !== req.headers["user-agent"]) {
            logger.warn("AUTH: Agent mismatch");
            throw new ClientError("Device mismatch", 401);
        };

        req.user = {
            id: user._id,
            role: user.role,
            email: user.email,
        };

        logger.debug(`AUTH: Authorized user ${req.user.email}`);
        next();
    } catch (error) {
        logger.error(`AUTH ERROR: ${error.message}`);
        return globalError(error, res)
    }
}