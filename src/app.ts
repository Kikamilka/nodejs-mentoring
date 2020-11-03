import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as bodyParser from "body-parser";

import {authRouter, groupRouter, userGroupRouter, userRouter} from "./api";
import {errorLogging, requestLogging} from "./configs/winston.config";
import {clientErrorHandler, errorHandler, logErrors,} from "./error-handlers/error-handler";
import {checkAuthToken} from "./middlewares/auth.middleware";

dotenv.config();

export const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use(requestLogging);

app.use(cors());

app.use("/", authRouter);
app.use(checkAuthToken);
app.use("/users", userRouter);
app.use("/groups", groupRouter);
app.use("/usergroup", userGroupRouter);

app.use(errorLogging);

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

process
    .on("unhandledRejection", (reason: Error, promise: Promise<any>) => {
        console.log(`${reason} \nUnhandled Rejection at: ${promise}`);
    })
    .on("uncaughtException", (err: Error) => {
        console.log(`Uncaught Exception: ${err}`);
        process.exit(1);
    });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
