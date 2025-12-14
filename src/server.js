const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookie = require('cookie-parser');
const bootstrap = require('./config/db');
const logger = require('./config/winston');
const mainRouter = require('./routes/main.routes');

const app = express();
app.use(cors({
    origin: ['http://127.0.0.1:5173', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.use(cookie());
app.use(express.json());
app.use("/api", mainRouter);

bootstrap();
const PORT = process.env.PORT || 3000;
app.listen(PORT, logger.info(`Server is running on http://127.0.0.1:${PORT}`));