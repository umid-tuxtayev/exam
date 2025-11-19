const CarsModel = require("../models/Cars.model");
const CategoryModel = require("../models/Catigoria.model");
const cloudinary = require("../config/cloudinary");
const logger = require("../config/winston");
const { ClientError } = require("shokhijakhon-error-handler");

class CarsService {
    async create(body, files) {

        const category = await CategoryModel.findById(body.categoryId);
        logger.info(body.categoryId);

        if (!category) throw new ClientError("Category not found", 404);
        if (!files.tashqi_makon || !files.ichki_makon || !files.model_image) {
            throw new ClientError("3 ta rasm majburiy!", 400);
        }

        const carData = {
            ...body,

            tashqi_makon: files.tashqi_makon[0].path,
            tashqi_makonId: files.tashqi_makon[0].filename,

            ichki_makon: files.ichki_makon[0].path,
            ichki_makonId: files.ichki_makon[0].filename,

            model_image: files.model_image[0].path,
            model_imageId: files.model_image[0].filename
        };

        const car = await CarsModel.create(carData);

        logger.info(`CAR CREATED: ${car._id}`);

        return car;
    }

    async getAll() {
        return await CarsModel.find().populate("categoryId");
    }

    async getOne(id) {
        const car = await CarsModel.findById(id).populate("categoryId");
        if (!car) throw new ClientError("Car not found", 404);

        return car;
    }

    async delete(id) {
        const car = await CarsModel.findByIdAndDelete(id);
        if (!car) throw new ClientError("Car not found", 404);

        await cloudinary.uploader.destroy(car.tashqi_makonId);
        await cloudinary.uploader.destroy(car.ichki_makonId);
        await cloudinary.uploader.destroy(car.model_imageId);

        logger.info(`CAR DELETED: ${id}`);

        return car;
    }

    async update(id, body = {}, files = {}) {
        const car = await CarsModel.findById(id);
        if (!car) throw new ClientError("Car not found", 404);

        logger.debug("UPDATE BODY =>", body);
        logger.debug("UPDATE FILES =>", files);

        if (body.categoryId) {
            const category = await CategoryModel.findById(body.categoryId);
            if (!category) throw new ClientError("Category not found", 404);
        }

        const updateData = { ...body };

        if (files.tashqi_makon) {
            await cloudinary.uploader.destroy(car.tashqi_makonId);
            updateData.tashqi_makon = files.tashqi_makon[0].path;
            updateData.tashqi_makonId = files.tashqi_makon[0].filename;
        }

        if (files.ichki_makon) {
            await cloudinary.uploader.destroy(car.ichki_makonId);
            updateData.ichki_makon = files.ichki_makon[0].path;
            updateData.ichki_makonId = files.ichki_makon[0].filename;
        }

        if (files.model_image) {
            await cloudinary.uploader.destroy(car.model_imageId);
            updateData.model_image = files.model_image[0].path;
            updateData.model_imageId = files.model_image[0].filename;
        }

        const updatedCar = await CarsModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate("categoryId");

        logger.info(`CAR UPDATED: ${id}`);

        return updatedCar;
    }


}

module.exports = new CarsService();
