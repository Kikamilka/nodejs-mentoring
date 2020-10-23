import {createLogger, format, transports} from "winston";
const { combine, timestamp, prettyPrint } = format;

export const winstonTransportOptions = {
    file: {
        level: 'error',
        filename: `src/logs/app.log`,
        handleExceptions: true,
        json: true,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
        colorize: false,
    },
    console: {
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};

export const winstonLogger = createLogger({
    format: combine(
        format.splat(),
        format.simple(),
        timestamp(),
        prettyPrint()
    ),
    transports: [new transports.Console(winstonTransportOptions.console)]
})
