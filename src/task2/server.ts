import express, {NextFunction, Request, Response} from 'express';

import {User} from "./models/user.model";
import {mapUsers} from "./users.mock";

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('node-api works!')
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

app.post('/user/:id', (req, res) => {
    let user = mapUsers.get(req.params.id);
    const bodyData = req.body;
    let newUserData: User;

    // если данные в body будут не полные, то при обновлении поменяются только те, что пришли,
    // а при создании нового, не указанные будут заполнены по умолчанию

    if (user) {
        newUserData = Object.assign({}, user, bodyData);
    } else {
        newUserData = Object.assign({
            id: req.params.id,
            age: null,
            login: '',
            password: '',
            isDeleted: false
        }, bodyData);
    }

    mapUsers.set(req.params.id, newUserData);

    res.status(204).send();
});

function getAutoSuggestUsers(limit: number, loginSub: string): Map<string, User> {
    let userValuesAsArray = [...mapUsers.values()];
    userValuesAsArray.sort((user1, user2) => user1.login.toLowerCase() > user2.login.toLowerCase() ? -1 : 1 );
    userValuesAsArray = userValuesAsArray.filter((user) => user.login.includes(loginSub));
    userValuesAsArray = userValuesAsArray.slice(0, limit);

    return new Map(userValuesAsArray.map(user => [user.id, user]));
}

function limitUsers (req: any, res: express.Response, next: express.NextFunction) {
    const loginSubstring = req.query.loginSubstring || '';
    const limit = req.query.limit || 1;
    req.limitUsers = getAutoSuggestUsers(limit, loginSubstring);
    next();
}

app.use(limitUsers);

app.get('/limitUsers', (req: any, res) => {
    let responseUsers = req.limitUsers;
    res.json([...responseUsers.values()]);
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

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
