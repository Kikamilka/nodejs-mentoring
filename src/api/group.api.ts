import express, {Request, Response} from 'express';
import {commonValidateSchema} from "../models/user.validation";
import {groupSchema} from "../models/group.validation";
import {GroupController} from "../controllers/group.ctrl";
import {safe} from 'express-safe-async';
import {checkToken} from "../auth/auth";

export const groupRouter = express.Router();
const groupCtrl = new GroupController();

groupRouter.get('/group/:id', checkToken,
    safe(async (req: Request, res: Response) => {
        const user = await groupCtrl.getGroupById(req.params.id);

        if (!user) {
            res.status(404).json({message: `User with id ${req.params.id} not found`});
        } else {
            res.status(200).json(user);
        }
    }
    ));

groupRouter.get('/', checkToken, safe(async (req: Request, res: Response) => {
    res.json(await groupCtrl.getAllGroups());
}));

groupRouter.post('/', [checkToken, commonValidateSchema(groupSchema)], safe(async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(404).json({message: `Group's data not found`});
        return null;
    }

    const group = await groupCtrl.createNewGroup(req.body);

    if (!group) {
        res.status(403).json({message: `Group with same name is exist`});
    } else {
        res.status(200).json({
            message: `New group was added`,
            group: group
        });
    }
}));

groupRouter.put('/', [checkToken, commonValidateSchema(groupSchema)], safe(async (req: Request, res: Response) => {
    if (!req.body) {
        res.status(404).json({message: `User's data not found`});
        return null;
    }

    const groupsUpdateCount = await groupCtrl.updateGroup(req.body);

    if (!groupsUpdateCount) {
        res.status(404).json({message: `Group with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `Group with id ${req.params.id} was updated`});
    }
}));

groupRouter.get('/remove/:id', checkToken, safe(async (req: Request, res: Response) => {
    const deletedGroup = await groupCtrl.removeGroup(req.params.id);

    if (!deletedGroup) {
        res.status(404).json({message: `Group with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `Group with id ${req.params.id} was deleted`});
    }
}));
