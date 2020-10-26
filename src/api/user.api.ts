import express, {NextFunction, Request, Response} from 'express';
import {userSchema, commonValidateSchema} from "../models/user.validation";
import {CustomRequest} from "../types/custom";
import {errorLogging} from "../configs/winston.config";
import {UserController} from "../controllers/user.ctrl";
import {safe} from 'express-safe-async';

export const userRouter = express.Router();
const userCtrl = new UserController();

userRouter.get('/user/:id', errorLogging,
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await userCtrl.getUserById(req.params.id);

        if (!user) {
            res.status(404).json({message: `User with id ${req.params.id} not found`});
        } else {
            res.status(200).json(user);
        }
    }
);

userRouter.get('/', safe(async (req: Request, res: Response) => {
    await userCtrl.getAllUsers().then(users => {
        res.json(users);
    })
}));

userRouter.get('/deletedUsers', safe(async (req: Request, res: Response) => {
    await userCtrl.getDeletedUsers().then(users => {
        res.json(users);
    })
}));

userRouter.post('/', commonValidateSchema(userSchema), safe(async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(404).json({message: `User's data not found`});
        return null;
    }

    const user = await userCtrl.createNewUser(req.body);

    if (!user) {
        res.status(403).json({message: `User with same login is exist`});
    } else {
        res.status(200).json({
            message: `New user was added`,
            user: user
        });
    }
}));

userRouter.put('/', commonValidateSchema(userSchema), safe(async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(404).json({message: `User's data not found`});
        return null;
    }

    const usersUpdateCount = await userCtrl.updateUser(req.body);

    if (!usersUpdateCount) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `User with id ${req.params.id} was updated`});
    }
}));

userRouter.get('/delete/:id', safe(async (req: Request, res: Response) => {
    const deletedUser = await userCtrl.deleteUser(req.params.id);

    if (!deletedUser) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `User with id ${req.params.id} was soft deleted`});
    }
}));

userRouter.get('/limitUsers', safe(async (req: CustomRequest, res: Response) => {
    const {loginSubstring, limit} = req.query;
    const limitUsersArray = userCtrl.getLimitUsers(limit ? +limit : 1, loginSubstring?.toString() || '');

    limitUsersArray
        .catch((err) => {
            console.log(err);
        }).then((users) => {
            res.json(users);
        }
    )
}));
