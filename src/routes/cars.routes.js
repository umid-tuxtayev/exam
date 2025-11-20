const { Router } = require('express');
const carsController = require('../controllers/cars.controller');
const uploadCars = require('../middleware/uploadCars');
const validate = require('../middleware/validate');
const carsValidator = require('../utils/cars.validator');
const carsRouter = Router();

carsRouter.get("/", carsController.getAll);
carsRouter.get("/:id", validate(carsValidator.getOne), carsController.getOne);
carsRouter.post("/create", validate(carsValidator.create), uploadCars, carsController.create);
carsRouter.delete("/delete/:id", validate(carsValidator.delete), carsController.delete);
carsRouter.put("/update/:id", validate(carsValidator.update), uploadCars, carsController.UPDATE);

module.exports = carsRouter;