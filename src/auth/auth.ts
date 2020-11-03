import {Response} from "express";
import jwt from 'jsonwebtoken';

import {UserController} from "../controllers/user.ctrl";
import {User} from "../models/user.model";

export const AUTH_SECRET = process.env.SECRET || 'secret001';

export async function login(reqLogin: string, reqPass: string, res: Response) {
    const users = await UserController.getAllUsers();
    const user = users.find((item: User) => item.getDataValue('login').toLowerCase() === reqLogin?.toLowerCase());

    if (!user || user.getDataValue('password').toLowerCase() !== reqPass.toLowerCase() || user.isDeleted) {
        return res.status(401).send({
            success: false,
            message: 'Invalid login/password combination'
        });
    }

    const payload = {id: user.id};
    const token = jwt.sign(payload, AUTH_SECRET, {expiresIn: 120});

    res.send(token);
}
