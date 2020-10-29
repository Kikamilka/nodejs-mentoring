import {DataTypes, Model} from "sequelize";
import {sequelize} from "../configs/sequelize.config";
import {GroupAttributes} from "../types/group-attributes.type";
import {Permission} from "../types/permission.type";

export class Group extends Model<GroupAttributes> implements GroupAttributes {
    public id!: string;
    public name!: string;
    public permissions!: Permission[];
}

Group.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: false,
        }
    },
    {
        tableName: "groups",
        sequelize,
        timestamps: false,
    }
);
