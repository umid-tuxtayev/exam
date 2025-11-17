const mongoose = require('mongoose');
const logger = require('./winston');

const bootstrap = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        return logger.info(`DB connection`);
    } catch (error) {
        return logger.error(`DB failed`);
    }
};

module.exports = bootstrap;