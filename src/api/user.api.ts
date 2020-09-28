import express, {Response} from 'express';
import {userSchema, userValidateSchema} from "../models/user.validation";
import {CustomRequest} from "../types/custom";
import * as userCtrl from "../controllers/user.ctrl";
import * as bodyParser from "body-parser";

const app = express();
const port = 3000;

const router = express.Router();
app.use(bodyParser.json());

router.get('/user/:id',
    async (req, res) => {
        const user = await userCtrl.getUserById(req.params.id);

        if (!user) {
            res.status(404).json({message: `User with id ${req.params.id} not found`});
        } else {
            res.status(200).json(user);
        }
    }
);

router.get('/', async (req, res) => {
    const users = await userCtrl.getAllUsers();
    res.json(users);
});

router.post('/', userValidateSchema(userSchema), async (req, res) => {
    if (!req.body) {
        res.status(404).json({message: `User's data not found`});
        return null;
    }

    const users = await userCtrl.createNewUser(req.body);

    if (!users) {
        res.status(403).json({message: `User with same login is exist`});
    } else {
        res.status(200).json([...users.values()]);
    }
});

router.put('/', userValidateSchema(userSchema), async (req, res) => {
    if (!req.body) {
        res.status(404).json({message: `User's data not found`});
        return null;
    }

    const users = await userCtrl.updateUser(req.body);

    if (!users) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        res.status(200).json([...users.values()]);
    }
});

router.get('/delete/:id', async (req, res) => {
    const deletedUser = await userCtrl.deleteUser(req.params.id);

    if (!deletedUser) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        res.status(200).json({message: `User with id ${req.params.id} was soft deleted`});
    }
});

router.get('/limitUsers', async (req: CustomRequest, res: Response) => {
    const {loginSubstring, limit} = req.query;
    const limitUsersArray = userCtrl.getLimitUsers(limit ? +limit : 1, loginSubstring?.toString() || '');

    res.json([...limitUsersArray.values()]);
});

app.use('/users', router);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
