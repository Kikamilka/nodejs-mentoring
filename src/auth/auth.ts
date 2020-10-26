import {NextFunction, Request, Response} from "express";
import jwt from 'jsonwebtoken';
import {UserController} from "../controllers/user.ctrl";
import {User} from "../models/user.model";

export const SECRET = 'secret007'; // его надо спрятать!

export async function login(reqLogin: string, reqPass: string, res: Response) {
    const users = await UserController.getAllUsers();
    const user = users.find((item: User) => item.login.toLowerCase() === reqLogin.toLowerCase());

    if (!user || user.password.toLowerCase() !== reqPass.toLowerCase() || user.isDeleted) {
        return res.status(401).send({
            success: false,
            message: 'Invalid login/password combination'
        });
    }

    const payload = {id: user.id};
    const token = jwt.sign(payload, SECRET, {expiresIn: 120});

    res.send(token);
}

export function checkToken(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers['x-access-token'];

    if(!token) {
        return res.status(401).send({
            success: false,
            message: 'No token provided'
        });
    }

    return jwt.verify(token, SECRET, (err: any) => {
        if (err) {
            return res.status(403).send({
                success: false,
                message: 'Failed to authenticate token'
            });
        }

        return next();
    })
}
