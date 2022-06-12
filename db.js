const mysql = require('mysql2');

const connection = mysql.createPool({
    // host: 'us-cdbr-east-05.cleardb.net',
    // user: 'b4605adbab0adc',
    // password: '547dfe70',
    // database: 'heroku_3786788db311ecb'
    host: 'localhost',
    user: 'root',
    // password: 'root',
    database: 'cat_api'
});


// Here is where the database is instantiated to connect the back end to the database
const query = (sql, paramaters) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, paramaters, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results)
            }
        })
    });
}

module.exports = { query }

