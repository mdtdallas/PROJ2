const db = require('../db')

module.exports.getAllcats = () => {
    return db.query('SELECT * FROM cats')
}

module.exports.getCatsById = (id) => {
    return db.query('SELECT * FROM cats WHERE id = ?', [id])
}

module.exports.getCatByEmail = (email) => {
    return db.query('SELECT * FROM cats WHERE email = ?', [email])
}

module.exports.getCatsByBreed = (breed) => {
    return db.query('SELECT * FROM cats WHERE breed = ?', [breed])
}

module.exports.getCatsByAge = (age) => {
    return db.query('SELECT * FROM cats WHERE age = ?', [age])
}

module.exports.getCatsByBreeder = (breeder) => {
    return db.query('SELECT * FROM cats WHERE breeder = ?', [breeder])
}

module.exports.createCat = (name, breed, age, image, breeder, email, dateTimeNow) => {
    return db.query('INSERT INTO cats (name, breed, age, image, breeder, email, timestamp)' + 'VALUES (?, ?, ?, ?, ?, ?, ?)', [name, breed, age, image, breeder, email, dateTimeNow])
}

module.exports.updateCat = (name, breed, age, breeder, id) => {
    return db.query('UPDATE cats SET name = ?, breed = ?, age = ?, breeder = ? WHERE id = ?', [name, breed, age, breeder, id])
}

module.exports.deleteCat = (id) => {
    return db.query('DELETE FROM cats WHERE id = ?', [id])
}
