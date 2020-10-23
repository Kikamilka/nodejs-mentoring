import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
import {userRouter} from "./api/user.api";
import {groupRouter} from "./api/group.api";
import {userGroupRouter} from "./api/user-group.api";
import {winstonLogger} from "./configs/winston.config";
import {clientErrorHandler, errorHandler, logErrors} from "./error-handlers/error-handler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(function (req: any, res: any, next: any) {
    winstonLogger.log(
       'info', `Request URL: ${req.originalUrl}`
    );
    next();
});

app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/usergroup', userGroupRouter);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

//?
app.use(function (err: any, req: any, res: any, next: any) {
    winstonLogger.log(
        'error', err.stack
    );
    res.status(500).send('Something broke!');
    next();
});

app.use(function (req: any, res: any, next: any) {
    winstonLogger.log(
        'info', `Request URL: ${req.originalUrl}`
    );
    next();
});

process.on('uncaughtException', (err: Error, origin: string) => {
    console.log(`Caught exception: ${err}\nException origin: ${origin}`);
// добавить обработку
});

process.on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
    console.log('Unhandled Rejection at:', promise, 'reason:', reason);
    throw new Error();
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
