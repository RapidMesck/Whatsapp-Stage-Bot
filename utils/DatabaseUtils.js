const pool = require('../ConnectDB.js');
require('dotenv').config();

const insertUser = (userNumber) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (user_number) VALUES (?)', [userNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.insertId);
            }
        });        
    });
};

const checkInsertedUser = (userNumber) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE user_number = ?', [userNumber], (error, results) => {
            if (error) {
                console.error('Erro ao buscar usuário:', error);
                reject(error); // Rejeita a promessa se houver um erro
            } else {
                const userExists = results.length > 0;
                resolve(userExists); // Resolve a promessa com o resultado
            }
        });
    });
};

const getUserStatus = (userNumber) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT status FROM users WHERE user_number = ?', [userNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0 ? results[0].status : null);
            }
        });
    });
};

const getUserLastUpdate = (userNumber) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT last_update FROM users WHERE user_number = ?', [userNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.length > 0 ? results[0].last_update : null);
            }
        });
    });
};

const updateUserStatus = (userNumber, threadStatus) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET status = ? WHERE user_number = ?', [threadStatus, userNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows);
            }
        });
    });
};

const updateUserLastMessage = (userNumber, message) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET last_message = ? WHERE user_number = ?', [message, userNumber], (error, results) => {
            if (error) {
                reject(error);
            } else {
                resolve(results.affectedRows);
            }
        });
    });
};

const getUsersNotUpdatedIn30Minutes = async () => {
    const query = `
        SELECT * 
        FROM users 
        WHERE last_update < CONVERT_TZ(NOW() - INTERVAL 30 MINUTE, @@session.time_zone, 'America/Sao_Paulo')
    `;

    const [users] = await db.execute(query);
    return users;
};

module.exports = { insertUser, checkInsertedUser, getUserStatus, getUserLastUpdate, updateUserStatus, updateUserLastMessage, getUsersNotUpdatedIn30Minutes }
