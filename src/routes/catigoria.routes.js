const { Router } = require('express');
const catigoriaController = require('../controllers/catigoria.controller');
const catigoriaRouter = Router();

catigoriaRouter.post('/create', catigoriaController.CREATE);


module.exports = catigoriaRouter;