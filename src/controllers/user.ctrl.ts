import {UserAttributes} from "../types/user-attributes";
import {UserDataAccessLayer} from "../data-access/user.dal";

const dataAccessLayer = new UserDataAccessLayer();

export class UserController {
    public async getUserById(userId: string) {
        return dataAccessLayer.getUserById(userId);
    }

    public async getAllUsers() {
        return dataAccessLayer.getAllUsers();
    }

    public async getDeletedUsers() {
        return dataAccessLayer.getDeletedUsers();
    }

    public async deleteUser(userId: string) {
        return await dataAccessLayer.deleteUser(userId).then((users) => {
            return users[0] > 0;
        }).catch(() => {
            return false;
        })
    };

    public async updateUser(newUser: UserAttributes) {
        return dataAccessLayer.updateUser(newUser);
    }

    public async createNewUser(user: UserAttributes) {
        return dataAccessLayer.createNewUser(user);
    }

    public async getLimitUsers(limit: number, loginSubstring: string) {
        return dataAccessLayer.getLimitUsers(limit, loginSubstring);
    }
}
