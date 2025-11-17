const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const bootstrap = require('./config/db');
const logger = require('./config/winston');
const mainRouter = require('./routes/main.routes');

const app = express();
app.use(cors());
app.use(cookie());
app.use(express.json());
app.use("/api", mainRouter);

bootstrap();
const PORT = process.env.PORT || 3000;
app.listen(PORT, logger.info(`Server is running on http://127.0.0.1:${PORT}`));