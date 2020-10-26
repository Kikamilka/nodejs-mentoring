import express from 'express';
import {commonValidateSchema} from "../models/user.validation";
import * as groupCtrl from "../controllers/group.ctrl";
import {groupSchema} from "../models/group.validation";

export const groupRouter = express.Router();

groupRouter.get('/group/:id',
    async (req, res) => {
        const user = await groupCtrl.getGroupById(req.params.id);

        if (!user) {
            res.status(404).json({message: `User with id ${req.params.id} not found`});
        } else {
            res.status(200).json(user);
        }
    }
);

groupRouter.get('/', async (req, res) => {
    await groupCtrl.getAllGroups().then(groups => {
        res.json(groups);
    });
});

groupRouter.post('/', commonValidateSchema(groupSchema), async (req, res) => {
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
});

groupRouter.put('/', commonValidateSchema(groupSchema), async (req, res) => {
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
});

groupRouter.get('/remove/:id', async (req, res) => {
    const deletedGroup = await groupCtrl.removeGroup(req.params.id);

    if (!deletedGroup) {
        res.status(404).json({message: `Group with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `Group with id ${req.params.id} was deleted`});
    }
});
