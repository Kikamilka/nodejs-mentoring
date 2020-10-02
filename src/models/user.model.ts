import {DataTypes, Model} from "sequelize";
import {sequelize} from "../configs/sequelize.config";

// вынести в types
export interface UserAttributes {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted?: boolean;
}

export class User extends Model<UserAttributes> implements UserAttributes {
    public id!: string;
    public login!: string;
    public password!: string;
    public age!: number;
    public isDeleted!: boolean | false;
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        }
    },
    {
        tableName: "users",
        sequelize,
        timestamps: false,
    }
);
