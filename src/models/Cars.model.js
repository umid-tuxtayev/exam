const { Schema, model, default: mongoose } = require('mongoose');

const carSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },

    description: {
        type: String,
        required: [true, 'description is required']
    },

    price: {
        type: Number,
        required: [true, 'price is required']
    },

    year: {
        type: Number,
        required: [true, 'price is required']
    },

    color: {
        type: String,
        required: [true, 'color is required']
    },

    distance: {
        type: String,
        required: [true, 'color is required']
    },

    tanirovka: {
        type: Boolean,
        required: [true, 'price is required'],
        default: "yo'q",
        enum: {
            values: ['bor', "yo'q"],
            message: '{VALUE} is not'
        }

    },

    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
}, { versionKey: false, timestamps: true });


module.exports = model('Cars', carSchema);