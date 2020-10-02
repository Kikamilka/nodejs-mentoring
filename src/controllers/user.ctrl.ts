import {UserAttributes} from "../models/user.model";
import {DataAccessLayer} from "../data-access/data-access";

const dataAccessLayer = new DataAccessLayer();

const getUserById = (userId: string) => {
    return dataAccessLayer.getUserById(userId);
};

const getAllUsers = () => {
    return dataAccessLayer.getAllUsers();
};

const getDeletedUsers = () => {
    return dataAccessLayer.getDeletedUsers();
};

const deleteUser = (userId: string): Promise<boolean> => {
    return dataAccessLayer.deleteUser(userId)
        .catch(() => {
            return Promise.resolve(false);
        }).then(() => {
            // возможно тут нужно проверить users[0].length
            return Promise.resolve(true);
        })
};

const updateUser = (newUser: UserAttributes) => {
    return dataAccessLayer.updateUser(newUser);
};

const createNewUser = (user: UserAttributes) => {
    return dataAccessLayer.createNewUser(user);
};

const getLimitUsers = (limit: number, loginSubstring: string) => {
    return dataAccessLayer.getLimitUsers(limit, loginSubstring);
};


export {
    createNewUser,
    deleteUser,
    getAllUsers,
    getDeletedUsers,
    getLimitUsers,
    getUserById,
    updateUser
};
