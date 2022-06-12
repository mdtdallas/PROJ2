const db = require('../db')

module.exports.getAllEntrants = () => {
    return db.query('SELECT * FROM entrants')
}

module.exports.getEntrantsByShow = (showID) => {
    return db.query('SELECT * FROM entrants WHERE showID = ?', [showID])
}

module.exports.getEntrantBycatID = (catID) => {
    return db.query('SELECT * FROM entrants WHERE catID = ?', [catID])
}

module.exports.getEntrantByEntrantID = (entrantID) => {
    return db.query('SELECT * FROM entrants WHERE entrantID = ?', [entrantID])
}

module.exports.createEntrant = (email, showID, catID) => {
    return db.query('INSERT INTO entrants (email, showID, catID)' + 'VALUES (?, ?, ?)', [email, showID, catID])
}