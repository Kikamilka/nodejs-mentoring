import express, {Request, Response} from 'express';
import {login} from "../auth/auth";

export const authRouter = express.Router();

authRouter.post('/auth',
    async (req: Request, res: Response) => {
        return login(req.body.login, req.body.password, res);
    }
);
