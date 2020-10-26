import {UserAttributes} from "../types/user-attributes";
import {UserDataAccessLayer} from "../data-access/user.dal";

const dataAccessLayer = new UserDataAccessLayer();

export const getUserById = (userId: string) => {
    return dataAccessLayer.getUserById(userId);
};

export const getAllUsers = () => {
    return dataAccessLayer.getAllUsers();
};

export const getDeletedUsers = () => {
    return dataAccessLayer.getDeletedUsers();
};

export const deleteUser = (userId: string): Promise<boolean> => {
    // REMARK: prefer to use async/await or then().catch() syntax TODO
    return dataAccessLayer.deleteUser(userId)
        .catch(() => {
            return Promise.resolve(false);
        }).then(() => {
            // возможно тут нужно проверить users[0].length
            return Promise.resolve(true);
        })
};

export const updateUser = (newUser: UserAttributes) => {
    return dataAccessLayer.updateUser(newUser);
};

export const createNewUser = (user: UserAttributes) => {
    return dataAccessLayer.createNewUser(user);
};

export const getLimitUsers = (limit: number, loginSubstring: string) => {
    return dataAccessLayer.getLimitUsers(limit, loginSubstring);
};
