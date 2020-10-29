import {UserAttributes} from "../types/user-attributes.type";
import {UserDataAccessLayer} from "../data-access/user.dal";

const dataAccessLayer = new UserDataAccessLayer();

export class UserController {
    public static async getUserById(userId: string) {
        return dataAccessLayer.getUserById(userId);
    }

    public static async getAllUsers() {
        return dataAccessLayer.getAllUsers();
    }

    public static async getDeletedUsers() {
        return dataAccessLayer.getDeletedUsers();
    }

    public static async deleteUser(userId: string) {
        return await dataAccessLayer.deleteUser(userId).then((users) => {
            return users[0] > 0;
        }).catch(() => {
            return false;
        })
    };

    public static async updateUser(newUser: UserAttributes) {
        return dataAccessLayer.updateUser(newUser);
    }

    public static async createNewUser(user: UserAttributes) {
        return dataAccessLayer.createNewUser(user);
    }

    public static async getLimitUsers(limit: number, loginSubstring: string) {
        return dataAccessLayer.getLimitUsers(limit, loginSubstring);
    }
}
