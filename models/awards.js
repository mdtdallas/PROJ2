const db = require('../db');

module.exports.getAllAwards = () => {
    return db.query('SELECT * FROM awards')
}

module.exports.getAwardsByCatID = (id) => {
    return db.query('SELECT * FROM awards WHERE catID = ?', [id])
}

module.exports.getAwardsByEmail = (email) => {
    return db.query('SELECT * FROM awards WHERE email = ?', [email])
}

module.exports.createAward = (title, year, email) => {
    return db.query('INSERT INTO awards (title, year, email)' + 'VALUES (?, ?, ?)', [title, year, email])
}

