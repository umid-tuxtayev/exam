const { ClientError } = require("shokhijakhon-error-handler");
const logger = require("../config/winston");
const CatigoriaModel = require("../models/Catigoria.model");
const catigoriaDto = require("../DTOS/catigories.dto");
const cloudinary = require('../config/cloudinary');
const generateSlug = require("../helpers/slug.helper");
const CarsModel = require("../models/Cars.model");

module.exports = {
    async create(data, url) {
        let catigories = await CatigoriaModel.findOne({ name: data.name });
        if (catigories) {
            logger.warn(`CATIGORIA CREATE: catigoria exists`);
            throw new ClientError('catigoria already exists', 400);
        }

        if (!url || !url.path || !url.filename) {
            throw new ClientError("Image required", 400);
        }

        const slug = await generateSlug(data.name);

        let create = await CatigoriaModel.create({
            ...data,
            slug,
            model_image: url.path,
            model_imageId: url.filename
        });

        return new catigoriaDto(create);
    },

    async getAll() {
        let catigoria = await CatigoriaModel.find();
        return catigoria.map(c => new catigoriaDto(c));
    },

    async getCarsByCategory(id) {

        const category = await CatigoriaModel.findById(id);
        if (!category) throw new ClientError("Category not found", 404);

        const cars = await CarsModel.find({ categoryId: id });

        return { category, cars };
    },


    async update(data, id, url) {
        let catigoria = await CatigoriaModel.findById(id);
        if (!catigoria) {
            logger.warn('UPDATE: CATIGORIA NOT FOUND!');
            throw new ClientError('catigoria not found', 404);
        }

        let updateData = { ...data };

        if (url) {
            if (catigoria.model_imageId) {
                await cloudinary.uploader.destroy(catigoria.model_imageId);
            }

            updateData.model_image = url.path;
            updateData.model_imageId = url.filename;
        }

        let updated = await CatigoriaModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return new catigoriaDto(updated);
    },

    async deleteCatigoria(id) {
        let catigoria = await CatigoriaModel.findById(id);
        if (!catigoria) {
            logger.warn('DELETE: CATIGORIA NOT FOUND!');
            throw new ClientError('catigoria not found', 404);
        }

        if (catigoria.model_imageId) {
            await cloudinary.uploader.destroy(catigoria.model_imageId);
        }

        await catigoria.deleteOne();

        return new catigoriaDto(catigoria);
    },

}
