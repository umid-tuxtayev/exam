const Joi = require("joi");

const messages = {
    "string.base": "{#label} faqat matn bo‘lishi kerak!",
    "string.empty": "{#label} kiritilmadi!",
    "any.required": "{#label} majburiy!",
};

module.exports = {

    create: {
        body: Joi.object({
            name: Joi.string().required().label("Kategoriya nomi").messages(messages),
            parent: Joi.string().allow(null, "").label("Ota kategoriya ID").messages(messages),
        })
    },

    update: {
        body: Joi.object({
            name: Joi.string().label("Kategoriya nomi").messages(messages),
            parent: Joi.string().allow(null, "").label("Ota kategoriya ID").messages(messages),
        }),

        params: Joi.object({
            id: Joi.string().required().label("Kategoriya ID").messages(messages)
        })
    },

    delete: {
        params: Joi.object({
            id: Joi.string().required().label("Kategoriya ID").messages(messages)
        })
    }
};
