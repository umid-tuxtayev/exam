const { globalError } = require("shokhijakhon-error-handler");
const logger = require('../config/winston.js');
const { create, getAll, update, deleteCatigoria, getOne, getCarsByCategory } = require("../services/catigoria.service.js");


module.exports = {
    async CREATE(req, res) {
        try {
            const { email } = req.user
            logger.debug(`CREATE CATIGORI REQUEST: ${email}`);
            let data = req.body;
            let catigoria = await create(data, req.file);
            return res.status(201).json({ message: 'Catigoria created', dto: catigoria, status: 201 })
        } catch (error) {
            logger.error(`CREATE CATIGORI: ${error.message}`);
            return globalError(error, res);
        }
    },

    async GET_ALL(req, res) {
        try {
            const { email } = req.user
            logger.debug(`GET ALL CATIGORI REQUEST: ${email}`);
            let catigorias = await getAll();
            return res.json({ message: 'get catigoria successfully', catigorias, status: 200 });
        } catch (error) {
            logger.error(`GET_ALL ERROR: ${error.message}`);
            return globalError(error, res);
        }
    },

    async UPDATE(req, res) {
        try {
            let data = req.body;
            const { email } = req.user
            let url = req.file
            logger.debug(`UPDATE CATIGORI REQUEST: ${email}`);
            let { id } = req.params;
            const catigoria = await update(data, id, url);
            logger.info(`CATIGORIYA UPDATE SUCCESSFULLY`);
            return res.json({ message: 'catigory update successfuly', catigoria, status: 200 });
        } catch (error) {
            logger.error(`UPDATE: ${error.message}`);
            return globalError(error, res);
        }
    },

    async DELETE(req, res) {
        try {
            const { email } = req.user
            logger.debug(`DELETE CATIGORI REQUEST: ${email}`);
            let { id } = req.params;
            let catigoria = await deleteCatigoria(id);
            logger.debug(`DELETE CATIGORI: ${email}`);
            return res.json({ message: 'CAtigoria delete successfully', catigoria, status: 200 })
        } catch (error) {
            logger.error(`DELETE CATIGORIA: ${error.message}`);
            return globalError(error, res);
        }
    },

    async GET_CARS(req, res) {
        try {
            const { id } = req.params;

            const result = await getCarsByCategory(id);

            return res.json({
                message: "Cars by category",
                ...result,
                status: 200
            });

        } catch (error) {
            return globalError(error, res);
        }
    }


}