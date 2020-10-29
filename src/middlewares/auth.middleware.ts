import {NextFunction, Request, Response} from "express";
import jwt from "jsonwebtoken";
import {AUTH_SECRET} from "../auth/auth";

export function checkAuthToken(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers['x-access-token'];

    if(!token) {
        return res.status(401).send({
            success: false,
            message: 'No token provided'
        });
    }

    return jwt.verify(token, AUTH_SECRET, (err: any) => {
        if (err) {
            return res.status(403).send({
                success: false,
                message: 'Failed to authenticate token'
            });
        }

        return next();
    })
}
