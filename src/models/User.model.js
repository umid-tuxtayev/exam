const { Schema, model } = require('mongoose');

const RefreshTokenSchema = new Schema({
    token: { type: String, required: true },
    userAgent: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Number },
    sessionExpires: { type: Number }
}, { _id: false });

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username is required'],
        trim: true,
        unique: true
    },

    first_name: {
        type: String,
        required: [true, 'first_name is required'],
        trim: true
    },

    last_name: {
        type: String,
        required: [true, 'last_name is required'],
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: [true, 'password is required']
    },

    otp: { type: String },

    otpTime: { type: Number },

    isVerified: {
        type: Boolean,
        default: false
    },

    role: {
        type: String,
        default: "user"
    },

    refreshTokens: [RefreshTokenSchema],
}, { versionKey: false, timestamps: true });

module.exports = model('users', userSchema);