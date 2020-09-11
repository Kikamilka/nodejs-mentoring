import {User} from "../models/user.model";
import {mapUsers} from "../data/users.mock";
import {generateId} from "../utils";

export function getLimitUsers(limit: number, loginSubstring: string): Map<string, User> {
    let userValuesAsArray = [...mapUsers.values()]
        .sort((user1, user2) => user1.login.toLowerCase() > user2.login.toLowerCase() ? -1 : 1)
        .filter((user) => user.login.includes(loginSubstring))
        .slice(0, limit);
    return new Map(userValuesAsArray.map(user => [user.id, user]));
}

const getUserById = async (userId: string) => {
    return mapUsers.get(userId);
};

const getAllUsers = async () => {
    return [...mapUsers.values()].filter((user) => !user.isDeleted);
};

const deleteUser = async (userId: string) => {
    let user = mapUsers.get(userId);
    if (user) {
        user.isDeleted = true;
        mapUsers.set(userId, user);
        return true;
    } else {
        return false;
    }
};

const updateUser = async (newUser: User) => {
    const updatedUsers = mapUsers.get(newUser.id);

    if (!updatedUsers) {
        return null;
    } else {
        return mapUsers.set(updatedUsers.id, newUser);
    }
};

const createNewUser = async (user: User) => {
    if ([...mapUsers.values()].find((curUser) => curUser.login === user.login)) {
        return null;
    }

    const newUser = Object.assign({}, user);
    newUser.id = generateId().toString();
    mapUsers.set(newUser.id, newUser);

    return mapUsers;
};

export {
    createNewUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUser
};
