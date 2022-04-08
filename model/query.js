const mysql = require('mysql');

const dbConfig = require('../config/dbconfig.js');
const connection = mysql.createConnection(dbConfig);

connection.connect(function (err) {
    if (err) {
        throw err;
    }
    console.log('Mysql connect success');
});

function query(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = query;