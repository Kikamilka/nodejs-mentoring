import express, {NextFunction, Request, Response} from 'express';
import {userSchema, commonValidateSchema} from "../models/user.validation";
import {CustomRequest} from "../types/custom";
import * as userCtrl from "../controllers/user.ctrl";

export const userRouter = express.Router();

userRouter.get('/user/:id',
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await userCtrl.getUserById(req.params.id);

        if (!user) {
            res.status(404).json({message: `User with id ${req.params.id} not found`});
        } else {
            res.status(200).json(user);
        }
    }
);

userRouter.get('/', async (req, res) => {
    await userCtrl.getAllUsers().then(users => {
        res.json(users);
    }).catch(err => console.log(err));
});

userRouter.get('/deletedUsers', async (req, res) => {
    await userCtrl.getDeletedUsers().then(users => {
        res.json(users);
    }).catch(err => console.log(err));
});

userRouter.post('/', commonValidateSchema(userSchema), async (req, res) => {
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
});

userRouter.put('/', commonValidateSchema(userSchema), async (req, res) => {
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
});

userRouter.get('/delete/:id', async (req, res) => {
    const deletedUser = await userCtrl.deleteUser(req.params.id);

    if (!deletedUser) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `User with id ${req.params.id} was soft deleted`});
    }
});

userRouter.get('/limitUsers', async (req: CustomRequest, res: Response) => {
    const {loginSubstring, limit} = req.query;
    const limitUsersArray = userCtrl.getLimitUsers(limit ? +limit : 1, loginSubstring?.toString() || '');

    limitUsersArray
        .catch((err) => {
            console.log(err);
        }).then((users) => {
            res.json(users);
        }
    )

});
