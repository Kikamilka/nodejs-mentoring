import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
import {userRouter} from "./api/user.api";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
