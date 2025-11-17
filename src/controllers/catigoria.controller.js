const { globalError } = require("shokhijakhon-error-handler");
const logger = require('../config/winston.js');
const { create } = require("../services/catigoria.service.js");


module.exports = {
    async CREATE(req, res) {
        try {
            logger.debug('CREATE CATIGORIE REQUEST');
            let data = req.body;
            let catigoria = await create(data);
            return res.status(201).json({ message: 'Catigoria created', dto: catigoria, status: 201 })
        } catch (error) {
            logger.error(`CREATE CATIGORI: ${error.message}`);
            return globalError(error, res);
        }
    }
}