const db = require('../db')

module.exports.getAllLogs = () => {
    return db.query('SELECT id, COUNT(id) as Req_Count, IP, email, userType  FROM logs group by IP order by Req_Count desc;')
}

module.exports.addLog = (IP, sessionID, action, url, email, userType) => {
    return db.query('INSERT INTO logs (IP, sessionID, action, url, email, userType)'+'VALUES (?, ?, ?, ?, ?, ?)', [IP, sessionID, action, url, email, userType])
}

module.exports.clearLog = () => {
    return db.query('TRUNCATE logs;')
}

module.exports.addDenyIP = (ip, access, email) => {
    return db.query('INSERT INTO iplist (ip, access, email)' + 'VALUES (?, ?, ?)', [ip, access, email])
}

module.exports.addAllowIP = (ip, access, email) => {
    return db.query('INSERT INTO iplist (ip, access, email)' + 'VALUES (?, ?, ?)', [ip, access, email])
}

module.exports.denyList = () => {
    return db.query('SELECT ip FROM iplist WHERE access = deny');
}