const mysql = require('mysql2');

const pool = mysql.createPool({
    host: process.env.HOST_DATABASE,
    port: process.env.PORT_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    database: process.env.NAMA_DATABASE,
}).promise();

module.exports = pool;