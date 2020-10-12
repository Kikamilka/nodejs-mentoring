import {Op} from "sequelize";

import {User} from "../models/user.model";
import {UserAttributes} from "../types/user-attributes";
import {generateId} from "../utils";
import {Group} from "../models/group.model";
import {GroupAttributes} from "../types/group-attributes";

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

    public getGroupById = (groupId: string): Promise<Group | null> => {
        return Group.findOne({where: {id: groupId}});
    };

    public getAllGroups = (): Promise<Group[]> => {
        return Group.findAll();
    };

    public updateGroup = (newGroup: GroupAttributes) => {
        return Group.update(newGroup, {
            where: {
                id: newGroup.id,
            },
        });
    };

    public createNewGroup = (group: GroupAttributes) => {
        return Group.create(
            {
                ...group,
                id: generateId().toString(),
            }
        );
    };

    public removeGroup = (groupId: string): Promise<number> => {
        return Group.destroy({
            where: {
                id: groupId
            }
        })
    };
}
