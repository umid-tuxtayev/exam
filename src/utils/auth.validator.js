const Joi = require("joi");

const messages = {
    "string.base": "{#label} faqat matn bo‘lishi kerak!",
    "string.empty": "{#label} bo‘sh bo‘lishi mumkin emas!",
    "string.min": "{#label} kamida {#limit} ta belgidan iborat bo‘lishi shart!",
    "string.email": "Email noto‘g‘ri formatda!",
    "any.required": "{#label} majburiy!",
    "string.length": "{#label} uzunligi {#limit} ta belgidan bo‘lishi kerak!"
};

module.exports = {

    register: {
        body: Joi.object({
            username: Joi.string().min(3).required().label("Foydalanuvchi nomi").messages(messages),
            first_name: Joi.string().required().label("Ism").messages(messages),
            last_name: Joi.string().required().label("Familiya").messages(messages),
            email: Joi.string().email().required().label("Email").messages(messages),
            password: Joi.string().min(6).required().label("Parol").messages(messages)
        })
    },

    login: {
        body: Joi.object({
            email: Joi.string().email().required().label("Email").messages(messages),
            password: Joi.string().required().label("Parol").messages(messages),
        })
    },

    verify: {
        body: Joi.object({
            email: Joi.string().email().required().label("Email").messages(messages),
            otp: Joi.string().length(6).required().label("Tasdiqlash kodi (OTP)").messages(messages)
        })
    },

    resendOtp: {
        body: Joi.object({
            email: Joi.string().email().required().label("Email").messages(messages)
        })
    },

    forgetPassword: {
        body: Joi.object({
            email: Joi.string().email().required().label("Email").messages(messages)
        })
    },

    changePassword: {
        body: Joi.object({
            email: Joi.string().email().required().label("Email").messages(messages),
            otp: Joi.string().length(6).required().label("Tasdiqlash kodi (OTP)").messages(messages),
            newPassword: Joi.string().min(6).required().label("Yangi parol").messages(messages)
        })
    }
};
