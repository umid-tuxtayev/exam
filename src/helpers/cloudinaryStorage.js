const { createCloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cloudinary = require('../config/cloudinary.js');

const storage = new createCloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        return {
            folder: 'my_app',
            allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
            transformation: [
                { width: 800, height: 800, crop: 'limit' }
            ]
        };
    }
});

const upload = multer({
    storage, 
    limits: {
        fieldSize: 1024 * 1024 * 5
    }
});

module.exports = upload;