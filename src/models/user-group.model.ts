import {DataTypes, Model} from "sequelize";
import {sequelize} from "../configs/sequelize.config";
import {UserGroupAttributes} from "../types/user-group-attributes.type";

export class UserGroup extends Model<UserGroupAttributes> implements UserGroupAttributes {
    public user_id!: string;
    public group_id!: string;
}

UserGroup.init(
    {
        user_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        group_id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
    },
    {
        tableName: "usergroup",
        sequelize,
        timestamps: false,
    }
);
