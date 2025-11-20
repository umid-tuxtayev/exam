const { Router } = require('express');
const catigoriaController = require('../controllers/catigoria.controller');
const upload = require('../helpers/cloudinaryStorage');
const validate = require('../middleware/validate');
const categoryValidator = require('../utils/category.validator');
const catigoriaRouter = Router();

catigoriaRouter.post('/create', validate(categoryValidator.create), upload.single('model_image'), catigoriaController.CREATE);
catigoriaRouter.get('/', catigoriaController.GET_ALL);
catigoriaRouter.put('/update/:id', validate(categoryValidator.update), upload.single('model_image'), catigoriaController.UPDATE);
catigoriaRouter.delete('/delete/:id', validate(categoryValidator.delete), catigoriaController.DELETE);
catigoriaRouter.get('/:id/cars', catigoriaController.GET_CARS);



module.exports = catigoriaRouter;