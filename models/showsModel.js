const db = require('../db')

module.exports.getAllShows = () => {
    return db.query('SELECT * FROM shows')
}

module.exports.getShowByShowID = (id) => {
    return db.query('SELECT * FROM shows WHERE id = ?', [id])
}

module.exports.getShowByTitle = (title) => {
    return db.query('SELECT * FROM shows WHERE title = ?', [title])
}

module.exports.getShowByDate = (date) => {
    return db.query('SELECT * FROM shows WHERE date = ?', [date])
}

module.exports.getShowByCouncil = (council) => {
    return db.query('SELECT * FROM shows WHERE council = ?', [council])
}

module.exports.createShow = (title, location, photo, judges, date, council, ticket_price, ticket_count, email) => {
    return db.query('INSERT INTO shows (title, location, image, judges, date, council, ticket_price, ticket_count, email)' + 'VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [title, location, photo, judges, date, council, ticket_price, ticket_count, email])
}

module.exports.updateShow = (title, location, image, judges, date, council, ticket_price, ticket_count, email, id) => {
    return db.query('UPDATE shows SET title = ?, location = ?, image = ?, judges = ?, date = ?, council = ?, ticket_price = ?, ticket_count = ?, email = ? WHERE id = ?', [title, location, image, judges, date, council, ticket_price, ticket_count, email, id])
}

module.exports.deleteShow = (id) => {
    return db.query('DELETE FROM shows WHERE id = ?', [id])
}