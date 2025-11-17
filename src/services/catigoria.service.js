const { ClientError } = require("shokhijakhon-error-handler");
const logger = require("../config/winston");
const CatigoriaModel = require("../models/Catigoria.model");
const catigoriaDto = require("../DTOS/catigories.dto");



module.exports = {
    async create(data) {
        let catigories = await CatigoriaModel.findOne({ name: data.name });
        if (catigories !== null) {
            logger.warn(`CATIGORIA CREATE: catigoria exists`);
            throw new ClientError('catigoria already exists', 400);
        };

        let create = await CatigoriaModel.create(data);
        let dto = new catigoriaDto(create);
        return dto;
    }
}