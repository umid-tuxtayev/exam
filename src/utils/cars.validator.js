const Joi = require("joi");

const messages = {
    "string.base": "{#label} matn bo‘lishi kerak!",
    "string.empty": "{#label} kiritilmadi!",
    "any.required": "{#label} majburiy!",
    "number.base": "{#label} raqam bo‘lishi kerak!",
    "any.only": "{#label} qiymati noto‘g‘ri!"
};

module.exports = {

    create: {
        body: Joi.object({
            name: Joi.string().required().label("Mashina nomi").messages(messages),
            description: Joi.string().required().label("Maʼlumot").messages(messages),
            price: Joi.number().required().label("Narx").messages(messages),
            year: Joi.number().required().label("Yil").messages(messages),
            color: Joi.string().required().label("Rang").messages(messages),
            distance: Joi.string().required().label("Yurgan masofa").messages(messages),

            tanirovka: Joi.string().valid("bor", "yo'q").label("Tanirovka").messages(messages),

            tashqi_makon: Joi.string().required().label("Tashqi makon").messages(messages),
            tashqi_makonId: Joi.string().allow(null, "").label("Tashqi makon ID").messages(messages),

            ichki_makon: Joi.string().required().label("Ichki makon").messages(messages),
            ichki_makonId: Joi.string().allow(null, "").label("Ichki makon ID").messages(messages),

            categoryId: Joi.string().required().label("Kategoriya ID").messages(messages)
        })
    },

    update: {
        body: Joi.object({
            name: Joi.string().label("Mashina nomi").messages(messages),
            description: Joi.string().label("Maʼlumot").messages(messages),
            price: Joi.number().label("Narx").messages(messages),
            year: Joi.number().label("Yil").messages(messages),
            color: Joi.string().label("Rang").messages(messages),
            distance: Joi.string().label("Yurgan masofa").messages(messages),

            tanirovka: Joi.string().valid("bor", "yo'q").label("Tanirovka").messages(messages),

            tashqi_makon: Joi.string().label("Tashqi makon").messages(messages),
            tashqi_makonId: Joi.string().allow(null, "").label("Tashqi makon ID").messages(messages),

            ichki_makon: Joi.string().label("Ichki makon").messages(messages),
            ichki_makonId: Joi.string().allow(null, "").label("Ichki makon ID").messages(messages),

            categoryId: Joi.string().label("Kategoriya ID").messages(messages)
        }),

        params: Joi.object({
            id: Joi.string().required().label("Mashina ID").messages(messages),
        })
    },

    getOne: {
        params: Joi.object({
            id: Joi.string().required().label("Mashina ID").messages(messages)
        })
    },

    delete: {
        params: Joi.object({
            id: Joi.string().required().label("Mashina ID").messages(messages)
        })
    }
};
