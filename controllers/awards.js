const express = require("express");
const router = express.Router();
const awardsModel = require("../models/awards");

router.get("/", (req, res) => {
  awardsModel
    .getAllAwards()
    .then((res) => res.json())
    .then((data) => {
      res.json(data);
    });
});

router.get('/:email', (req, res) => {
    awardsModel.getAwardsByEmail(req.params.email)
    .then((results) => {res.json(results)})
})

router.post("/create", (req, res) => {
  const { title, year, email } = req.body;
  awardsModel.createAward(title, year, email).then((data) => {
    res.status(201).json({status: 'Award Added', data});
  });
});

module.exports = router;
