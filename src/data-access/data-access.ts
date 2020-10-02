import {User, UserAttributes} from "../models/user.model";
import {generateId} from "../utils";
import {Op} from "sequelize";

export class DataAccessLayer {
    public getUserById = (userId: string): Promise<User | null> => {
        return User.findOne({where: {id: userId}});
    };

    public getAllUsers = (): Promise<User[]> => {
        return User.findAll({
            where:
                {
                    isDeleted: false,
                }
        });
    };

    public getDeletedUsers = (): Promise<User[]> => {
        return User.findAll({
            where:
                {
                    isDeleted: true,
                }
        });
    };

    public deleteUser = (userId: string): Promise<[number, User[]]> => {
        return User.update(
            {isDeleted: true},
            {
                where: {
                    id: userId,
                },
            }
        );
    };

    public updateUser = (newUser: UserAttributes) => {
        console.log(newUser);
        return User.update(newUser, {
            where: {
                id: newUser.id,
            },
        });
    };

    public createNewUser = (user: UserAttributes) => {
        return User.create(
            {
                ...user,
                id: generateId().toString(),
                isDeleted: false,
            }
        );
    };

    public getLimitUsers = (
        limit: number,
        loginSubstring: string
    ): Promise<{ rows: User[]; count: number }> => {
        return User.findAndCountAll({
            where: {
                login: {
                    [Op.substring]: loginSubstring,
                },
            },
            limit: limit,
        });
    };
}
