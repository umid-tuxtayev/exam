const { Router } = require('express');
const authRouter = require('./auth.routes');
const authMiddleware = require('../middleware/auth.middleware');
const catigoriaRouter = require('./catigoria.routes');
const mainRouter = Router();

mainRouter.use('/auth', authRouter);
mainRouter.use(authMiddleware);
mainRouter.use('/catigoria', catigoriaRouter);

module.exports = mainRouter;