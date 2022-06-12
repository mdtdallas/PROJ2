const db = require('../db')

module.exports.getAllUsers = () => {
    return db.query('SELECT * FROM users')
}

module.exports.getUserById = (id) => {
    return db.query('SELECT * FROM users WHERE id = ?', [id])
} 

module.exports.getUserByEmail = (email) => {
    return db.query('SELECT * FROM users WHERE email = ?', [email])
}

module.exports.getUserByName = (name) => {
    return db.query('SELECT * FROM users WHERE name = ?', [name])
}

module.exports.getUserByPhone = (phone) => {
    return db.query('SELECT * FROM users WHERE phone = ?', [phone])
}

module.exports.createUser = (email, password, name, phone, userType, image) => {
    return db.query('INSERT INTO users (email, password, name, phone, userType, image)' + 'VALUES (?, ?, ?, ?, ?, ?)', [email, password, name, phone, userType, image])
}

module.exports.updateUser = (email, password, name, phone, image, userType, id) => {
    return db.query('UPDATE users SET email = ?, password = ?, name = ?, phone = ?, image = ?, userType = ? WHERE id = ?', [email, password, name, phone, image, userType, id])
}

module.exports.deleteUser = (id) => {
    return db.query('DELETE FROM users WHERE id = ?', [id])
}