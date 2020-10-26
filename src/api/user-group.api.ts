import express, {Request, Response} from 'express';
import * as userGroupCtrl from "../controllers/user-group.ctrl";
import {safe} from "express-safe-async";

export const userGroupRouter = express.Router();

userGroupRouter.get('/getUsersInGroup/:id',
    safe(async (req: Request, res: Response) => {
        const user = await userGroupCtrl.getUsersInGroupById(req.params.id);

        if (!user) {
            res.status(404).json({message: `Group with id ${req.params.id} not found`});
        } else {
            res.status(200).json(user);
        }
    }
));

userGroupRouter.get('/', safe(async (req: Request, res: Response) => {
    await userGroupCtrl.getAllUserGroup().then(userGroups => {
        res.json(userGroups);
    });
}));

userGroupRouter.get('/removeByUser/:id', safe(async (req: Request, res: Response) => {
    const deletedRows = await userGroupCtrl.removeUser(req.params.id);

    if (!deletedRows) {
        res.status(404).json({message: `Rows with user id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `Rows with user id ${req.params.id} was deleted`});
    }
}));

userGroupRouter.get('/removeByGroup/:id', safe(async (req: Request, res: Response) => {
    const deletedRows = await userGroupCtrl.removeGroup(req.params.id);

    if (!deletedRows) {
        res.status(404).json({message: `Rows with group id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `Rows with group id ${req.params.id} was deleted`});
    }
}));

userGroupRouter.post('/',  safe(async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(404).json({message: `Group's data not found`});
        return null;
    }

    const groupId = req.body['groupId'];
    const userIds = req.body['userIds'];

    const isCreated = await userGroupCtrl.addUsersInGroup(groupId, userIds);

    if (!isCreated) {
        res.status(404).json({message: `Something happened`});
    } else {
        res.status(200).json(isCreated);
    }

}));
