const { Schema, model, default: mongoose } = require('mongoose');

const carSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    year: { type: Number, required: true },
    color: { type: String, required: true },
    distance: { type: String, required: true },

    tanirovka: {
        type: String,
        default: "yo'q",
        enum: ['bor', "yo'q"]
    },

    tashqi_makon: { type: String, required: true },
    tashqi_makonId: { type: String },

    ichki_makon: { type: String, required: true },
    ichki_makonId: { type: String },

    model_image: { type: String, required: true },
    model_imageId: { type: String },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },

}, { versionKey: false, timestamps: true });

module.exports = model('Cars', carSchema);
