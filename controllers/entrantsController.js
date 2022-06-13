const express = require("express");
const router = express.Router();
const entrantsModel = require("../models/entrantsModel");
const { validateToken } = require("./Auth");

router.get("/entrants", validateToken, (req, res) => {
  entrantsModel
    .getAllEntrants()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.get("/entrantsShowID/:showID", validateToken, (req, res) => {
  entrantsModel
    .getEntrantsByShow(req.params.showID)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.get("/entrant/:catID", validateToken, (req, res) => {
  entrantsModel
    .getEntrantBycatID(req.params.catID)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.get("/entrantEntID/:entrantID", validateToken, (req, res) => {
  entrantsModel
    .getEntrantByEntrantID(req.params.entrantID)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.post("/entrant/create", validateToken, (req, res) => {
  let entrant = req.body;
  entrantsModel
    .createEntrant(
      // req.session.user.email,
      entrant.email,
      entrant.showID,
      entrant.catID
    )
    .then((results) => {
      res.status(200).json({ status: `${entrant.email} has been created` });
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

module.exports = router;
