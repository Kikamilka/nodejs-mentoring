import express, {NextFunction, Request, Response} from 'express';
import {commonValidateSchema, userSchema} from "../models/user.validation";
import {CustomRequest} from "../types/custom.type";
import {UserController} from "../controllers/user.ctrl";
import {safe} from 'express-safe-async';
import {checkToken} from "../auth/auth";

export const userRouter = express.Router();

userRouter.get('/user/:id', checkToken,
    safe(async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserController.getUserById(req.params.id);

        if (!user) {
            res.status(404).json({message: `User with id ${req.params.id} not found`});
        } else {
            res.status(200).json(user);
        }
    }
    ));

userRouter.get('/', checkToken, safe(async (req: Request, res: Response) => {
    res.json(await UserController.getAllUsers());
}));

userRouter.get('/deletedUsers', checkToken, safe(async (req: Request, res: Response) => {
    res.json(UserController.getDeletedUsers());
}));

userRouter.post('/', commonValidateSchema(userSchema), safe(async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(404).json({message: `User's data not found`});
        return null;
    }

    const user = await UserController.createNewUser(req.body);

    if (!user) {
        res.status(403).json({message: `User with same login is exist`});
    } else {
        res.status(200).json({
            message: `New user was added`,
            user: user
        });
    }
}));

userRouter.put('/', [checkToken, commonValidateSchema(userSchema)], safe(async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(404).json({message: `User's data not found`});
        return null;
    }

    const usersUpdateCount = await UserController.updateUser(req.body);

    if (!usersUpdateCount) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `User with id ${req.params.id} was updated`});
    }
}));

userRouter.get('/delete/:id', checkToken, safe(async (req: Request, res: Response) => {
    const deletedUser = await UserController.deleteUser(req.params.id);

    if (!deletedUser) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `User with id ${req.params.id} was soft deleted`});
    }
}));

userRouter.get('/limitUsers', checkToken, safe(async (req: CustomRequest, res: Response) => {
    const {loginSubstring, limit} = req.query;
    const limitUsersArray = UserController.getLimitUsers(limit ? +limit : 1, loginSubstring?.toString() || '');

    limitUsersArray
        .catch((err) => {
            console.log(err);
        }).then((users) => {
            res.json(users);
        }
    )
}));
