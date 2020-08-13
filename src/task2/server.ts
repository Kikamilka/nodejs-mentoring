import express, {NextFunction, Request, Response} from 'express';

import {User} from "./models/user.model";
import {mapUsers} from "./data/users.mock";
import {userSchema, validateSchema} from "./validation";

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

function getAutoSuggestUsers({query: {limit = 1, loginSub = ''}}): Map<string, User> {
    let userValuesAsArray = [...mapUsers.values()];
    userValuesAsArray.sort((user1, user2) => user1.login.toLowerCase() > user2.login.toLowerCase() ? -1 : 1 );
    userValuesAsArray = userValuesAsArray.filter((user) => user.login.includes(loginSub));
    userValuesAsArray = userValuesAsArray.slice(0, limit);

    return new Map(userValuesAsArray.map(user => [user.id, user]));
}

function limitUsers (req: any, res: express.Response, next: express.NextFunction) {
    req.limitUsers = getAutoSuggestUsers(req.query);
    next();
}

// это нужно только для /limitUsers
// app.use(limitUsers);

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

app.post('/users', validateSchema(userSchema), (req, res) => {
    const user = req.body;

    mapUsers.set(req.params.id, user);

    res.json([...mapUsers.values()]);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
