import express from 'express';
import * as userGroupCtrl from "../controllers/user-group.ctrl";

export const userGroupRouter = express.Router();

userGroupRouter.get('/getUsersInGroup/:id',
    async (req, res) => {
        const user = await userGroupCtrl.getUsersInGroupById(req.params.id);

        if (!user) {
            res.status(404).json({message: `Group with id ${req.params.id} not found`});
        } else {
            res.status(200).json(user);
        }
    }
);

userGroupRouter.get('/', async (req, res) => {
    await userGroupCtrl.getAllUserGroup().then(userGroups => {
        res.json(userGroups);
    });
});

userGroupRouter.get('/removeByUser/:id', async (req, res) => {
    const deletedRows = await userGroupCtrl.removeUser(req.params.id);

    if (!deletedRows) {
        res.status(404).json({message: `Rows with user id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `Rows with user id ${req.params.id} was deleted`});
    }
});

userGroupRouter.get('/removeByGroup/:id', async (req, res) => {
    const deletedRows = await userGroupCtrl.removeGroup(req.params.id);

    if (!deletedRows) {
        res.status(404).json({message: `Rows with group id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `Rows with group id ${req.params.id} was deleted`});
    }
});

userGroupRouter.post('/',  async (req, res) => {
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

});
