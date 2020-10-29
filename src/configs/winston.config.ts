import expressWinston from 'express-winston';
import winston, {format} from "winston";

export const requestLogging = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json(),
    )
})

export const errorLogging = expressWinston.errorLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        winston.format.json(),
    )
})
