const { globalError } = require("shokhijakhon-error-handler");
const logger = require("../config/winston");
const carsService = require("../services/cars.service");

module.exports = {

    async create(req, res) {
        try {
            console.log(req.body);

            const car = await carsService.create(req.body, req.files);

            return res.status(201).json({
                success: true,
                car
            });

        } catch (error) {
            logger.error(`CAR CREATE ERROR: ${error.message}`);
            return globalError(error, res)
        }
    },

    async getAll(req, res) {
        try {
            const cars = await carsService.getAll();
            return res.json(cars);

        } catch (error) {
            logger.error(`CAR GETALL ERROR: ${error.message}`);
            return globalError(error, res)
        }
    },

    async getOne(req, res) {
        try {
            const car = await carsService.getOne(req.params.id);
            return res.json(car);

        } catch (error) {
            logger.error(`CAR GETONE ERROR: ${error.message}`);
            return globalError(error, res)
        }
    },

    async delete(req, res) {
        try {
            await carsService.delete(req.params.id);

            return res.json({
                success: true,
                message: "Car deleted"
            });

        } catch (error) {
            logger.error(`CAR DELETE ERROR: ${error.message}`);
            return globalError(error, res)
        }
    },

    async UPDATE(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;
            const files = req.files;

            const car = await carsService.update(id, body, files);
            return res.json({
                success: true,
                message: "Car updated"
            });

        } catch (error) {
            logger.error(`CAR UPDATE ERROR: ${error.message}`);
            console.log(error);
            return globalError(error, res);
        }
    }

};
