const { ClientError } = require("shokhijakhon-error-handler");
const UserModel = require("../models/User.model.js");

module.exports = {
    async createUser(data) {
        return UserModel.create(data);
    },

    async findUserByEmail(email) {
        return UserModel.findOne({ email });
    },

    async updateUser(email, updateData) {
        const user = await UserModel.findOne({ email });
        if (!user) throw new ClientError("User not found", 404);
        Object.assign(user, updateData);
        return user.save();
    },

    async findByUserId(id) {
        const user = await UserModel.findById(id);
        return user;
    },

    async deleteRefreshToken(userId, token) {
        return UserModel.updateOne(
            { _id: userId },
            { $pull: { refreshTokens: { token } } }
        );
    }
};
