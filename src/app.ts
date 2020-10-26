import express, {Request, Response} from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import * as bodyParser from "body-parser";

import {userRouter} from "./api/user.api";
import {groupRouter} from "./api/group.api";
import {userGroupRouter} from "./api/user-group.api";
import {errorLogging, requestLogging} from "./configs/winston.config";
import {clientErrorHandler, errorHandler, logErrors} from "./error-handlers/error-handler";
import {User} from "./models/user.model";
import {login, SECRET} from "./auth/auth";
import {UserController} from "./controllers/user.ctrl";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

export const commonRouter = express.Router();

app.use(bodyParser.json());

app.use(requestLogging);

app.use(cors());

app.use('/', commonRouter);
app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/usergroup', userGroupRouter);

commonRouter.post('/auth',
    async (req: Request, res: Response) => {
        return login(req.body.login, req.body.password, res);
    }
);

app.use(errorLogging);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

process
    .on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
        console.log(`${reason} \nUnhandled Rejection at: ${promise}`);
    })
    .on('uncaughtException', (err: Error) => {
        console.log(`Uncaught Exception: ${err}`);
        process.exit(1);
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
