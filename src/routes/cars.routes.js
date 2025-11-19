const { Router } = require('express');
const carsController = require('../controllers/cars.controller');
const uploadCars = require('../middleware/uploadCars');
const carsRouter = Router();

carsRouter.get("/", carsController.getAll);
carsRouter.get("/:id", carsController.getOne);
carsRouter.post("/create", uploadCars, carsController.create);
carsRouter.delete("/delete/:id", carsController.delete);
carsRouter.put("/update/:id", uploadCars, carsController.UPDATE);

module.exports = carsRouter;