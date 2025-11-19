const multer = require("multer");
const { createCloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new createCloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: "cars",
            allowed_formats: ["jpeg", "jpg", "png", "webp"]
        };
    }
});

module.exports = multer({ storage }).fields([
    { name: "tashqi_makon", maxCount: 1 },
    { name: "ichki_makon", maxCount: 1 },
    { name: "model_image", maxCount: 1 }
]);
