import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from "body-parser";
import {userRouter} from "./api/user.api";
import {groupRouter} from "./api/group.api";
import {userGroupRouter} from "./api/user-group.api";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(bodyParser.json());

app.use('/users', userRouter);
app.use('/groups', groupRouter);
app.use('/usergroup', userGroupRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
