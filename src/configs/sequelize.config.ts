import {Sequelize} from "sequelize";

export const sequelize = new Sequelize(
    'dd36q9fk7m633e',
    'kovklwtcrorhkv',
    'de06a438cb62a63125e5fb1759ac35a2f61c35204cf632e51ebdaf63193d0e9a',
    {
        dialect: 'postgres',
        host: 'ec2-52-31-233-101.eu-west-1.compute.amazonaws.com',
        port: 5432,
        pool: {
            min: 0,
            max: 5,
            acquire: 30000,
            idle: 10000,
        },
        dialectOptions: {
            ssl: {
                rejectUnauthorized: false
            }
        },
        quoteIdentifiers: false,
    });
