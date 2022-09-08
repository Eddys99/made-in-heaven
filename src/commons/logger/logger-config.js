const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}][${level}]: ${message}`;
});

const myLogger = createLogger({
    format: combine(
        format.colorize(),
        timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        myFormat
    ),
    transports: [new transports.Console()]
});

myLogger.debug('hello debug');
myLogger.error('hello error');
myLogger.info('hello info');

module.exports = myLogger;
