require("dotenv").config();

const mysql = require('mysql2');

const connection = mysql.createPool({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME
    // host: 'localhost',
    // user: 'root',
    // password: 'root',
    // database: 'cat_api'
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

