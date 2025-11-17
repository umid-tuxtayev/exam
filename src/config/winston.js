const winston = require('winston');
require('winston-daily-rotate-file');

const { combine, colorize, timestamp, printf } = winston.format;

const logFormat = printf(({ level, timestamp, message }) => {
    return `${timestamp} | ${level} | ${message}`
});

const dailyRotate = new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
});

const logError = new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%-error.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
});

const logCombin = new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%-combin.log',
    datePattern: 'YYYY-MM-DD',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '30d'
});

const logger = winston.createLogger({
    level: 'debug',
    format: combine(timestamp(), logFormat),
    transports: [
        dailyRotate,
        logCombin,
        logError
    ]
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new winston.transports.Console({
            format: combine(timestamp(), colorize({all: true}), logFormat)
        })
    )
};

module.exports = logger;