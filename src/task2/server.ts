import express, {NextFunction, Response} from 'express';

import {User} from "./models/user.model";
import {mapUsers} from "./data/users.mock";
import {userSchema, validateSchema} from "./validation";
import {CustomRequest} from "../../custom";

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        '1': 'Get user: /user/:id',
        '2': 'Get list all users: /users',
        '3': 'Delete user: /delete/:id',
        '4': 'Get limited filtered users: /limitUsers&limit=*&loginSubstring=*',
        '5': 'Create or update user - POST: /users with User in body'
    });
});

app.get('/user/:id', (req, res) => {
    const user = mapUsers.get(req.params.id);
    if (!user) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        res.json(user);
    }
});

app.get('/users', (req, res) => {
    res.json([...mapUsers.values()]);
});

app.get('/delete/:id', (req, res) => {
    let user = mapUsers.get(req.params.id);

    if (!user) {
        res.status(404).json({message: `User with id ${req.params.id} not found`});
    } else {
        user.isDeleted = true;
        mapUsers.set(req.params.id, user);
        res.json({message: `User with id ${req.params.id} was soft deleted`});
    }
});

app.post('/users', validateSchema(userSchema), (req, res) => {
    const user = req.body;

    mapUsers.set(req.params.id, user);

    res.json([...mapUsers.values()]);
});

function getAutoSuggestUsers(limit: number, loginSubstring: string): Map<string, User> {
    let userValuesAsArray = [...mapUsers.values()];
    userValuesAsArray.sort((user1, user2) => user1.login.toLowerCase() > user2.login.toLowerCase() ? -1 : 1 );
    userValuesAsArray = userValuesAsArray.filter((user) => user.login.includes(loginSubstring));
    userValuesAsArray = userValuesAsArray.slice(0, limit);

    return new Map(userValuesAsArray.map(user => [user.id, user]));
}

function limitUsers (req: CustomRequest, res: Response, next: NextFunction) {
    const loginSubstring = req.query.loginSubstring?.toString() || '';
    const limit = req.query.limit ? +req.query.limit : 1;
    req.limitUsers = getAutoSuggestUsers(limit, loginSubstring);
    next();
}

app.get<any, CustomRequest, any, any>('/limitUsers', [limitUsers], (req: CustomRequest, res: Response, next: NextFunction) => {
    next();
}, (req: CustomRequest, res: Response) => {
    const resMap = req.limitUsers ? [...req.limitUsers?.values()] : [];
    res.json(resMap);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
