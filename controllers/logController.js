const express = require('express')
const router = express.Router()
const logModel = require('../models/logModel')
const { validateToken } = require("./Auth");

router.delete('/clear', validateToken, (req, res) => {
    logModel.clearLog()
    .then((results) => {
        res.status(200).json({status: 'Logs Cleared!', results})
    })
    .catch((error) => {
        res.status(500).json({error: 'Could not clear logs!'})
    })
})

router.get('/all', validateToken, (req, res) => {
    logModel.getAllLogs()
    .then((results) => {
        res.status(200).json(results)
    })
    .catch((error) => {
        res.status(500).json({error: `Query error ${error}`})
    })
})


module.exports = router