const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
        query: {
            raw: true,
        },
    },
    test: {
        username: 'root',
        password: null,
        database: 'database_test',
        host: '127.0.0.1',
        dialect: 'mysql',
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: 'mysql',
        query: {
            raw: true,
        },
    },
};

// development: {
//     username: 'HAITRIEU',
//     password: '040202005173',
//     database: 'managerrental',
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: false,
//     query: {
//         raw: true,
//     },
//     timezone: '+07:00',
// },
// test: {
//     username: 'root',
//     password: null,
//     database: 'database_test',
//     host: '127.0.0.1',
//     dialect: 'mysql',
// },
// production: {
//     username: 'HAITRIEU',
//     password: '040202005173',
//     database: 'managerrental',
//     host: 'localhost',
//     dialect: 'mysql',
// },
