const { Schema, model, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    slug: {
        type: String,
        required: true,
        unique: true,
    },

    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Category", categorySchema);
