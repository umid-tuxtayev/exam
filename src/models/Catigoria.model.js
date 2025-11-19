const { Schema, model, default: mongoose } = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    slug: { type: String, unique: true },

    model_image: {
        type: String,
        required: [true, 'model rasmi majbury']
    },

    model_imageId: {
        type: String
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

categorySchema.virtual("children", {
    ref: "Category",
    localField: "_id",
    foreignField: "parent"
});

module.exports = model("Category", categorySchema);
