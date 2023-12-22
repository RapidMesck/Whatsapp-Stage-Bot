const mysql = require('mysql2');
require('dotenv').config();
  
const pool = mysql.createPool({
    host: process.env.MYSQL_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DB,
    waitForConnections: true,
    connectionLimit: 20,
    queueLimit: 0
});

pool.on('acquire', function (connection) {
    console.log('Conexão %d adquirida', connection.threadId);
});

pool.on('release', function (connection) {
    console.log('Conexão %d liberada', connection.threadId);
});

module.exports = pool; // exporta o pool de conexões
