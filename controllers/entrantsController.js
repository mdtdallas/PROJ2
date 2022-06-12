const express = require("express");
const router = express.Router();
const entrantsModel = require("../models/entrantsModel");

router.get("/entrants", (req, res) => {
  entrantsModel
    .getAllEntrants()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.get("/entrantsShowID/:showID", (req, res) => {
  entrantsModel
    .getEntrantsByShow(req.params.showID)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.get("/entrant/:catID", (req, res) => {
  entrantsModel
    .getEntrantBycatID(req.params.catID)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.get("/entrantEntID/:entrantID", (req, res) => {
  entrantsModel
    .getEntrantByEntrantID(req.params.entrantID)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.post("/entrant/create", (req, res) => {
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
