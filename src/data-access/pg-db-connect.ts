import {Client} from 'pg';

/* Тестовое подключение в БД, до использования sequelize */

const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});

client.connect();

client.query('SELECT * FROM USERGROUP;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
        console.log(JSON.stringify(row));
    }
    client.end();
});

// client.query('CREATE TABLE USERS(' +
//     'id        text,' +
//     'login     text,' +
//     'password  text,' +
//     'age       int,' +
//     'isDeleted boolean,' +
//     'primary key (id))', (err, res) => {
//     if (err) throw err;
//     client.end();
// });
