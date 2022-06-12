const express = require("express");
const router = express.Router();
const validator = require("validator");
const showsModel = require("../models/showsModel");
const { validateToken } = require("./Auth");

router.get("/shows", validateToken, (req, res) => {
  showsModel
    .getAllShows()
    .then((results) => {
      res.status(200).json({results, status: 'Shows Loaded!'} );
    })
    .catch((error) => {
      res.status(500).json({ error: "Query error" + error });
    });
});

router.get("/showsShowID/:id", (req, res) => {
  showsModel
    .getShowByShowID(req.params.id)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Query error" + error });
    });
});

router.get("/showsTitle/:title", (req, res) => {
  showsModel
    .getShowByTitle(req.params.title)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Query error" + error });
    });
});

router.get("/showsDate/:date", (req, res) => {
  showsModel
    .getShowByDate(req.params.date)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Query error" + error });
    });
});

router.get("/showsCouncil/:council", (req, res) => {
  showsModel
    .getShowByCouncil(req.params.council)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Query error" + error });
    });
});

router.post("/shows/create", (req, res) => {
  const show = req.body;
  if (validator.isAscii(show.title) == false) {
    res.status(406).json({warning: "Show title is required"});
    return;
  }
  if (validator.isAscii(show.location) == false) {
    res.status(406).json({warning: "Show location is required"});
    return;
  }
  if (validator.isAscii(show.judges) == false) {
    res.status(406).json({warning: "Show judge is required"});
    return;
  }
  if (validator.isAscii(show.date) == false) {
    res.status(406).json({warning: "Show date is required"});
    return;
  }
  if (validator.isAscii(show.council) == false) {
    res.status(406).json({warning: "Show council is required"});
    return;
  }
  if (validator.isAscii(show.ticket_price) == false) {
    res.status(406).json({warning: "Ticket price is required"});
    return;
  }
  if (validator.isAscii(show.ticket_count) == false) {
    res.status(406).json({warning: "Ticket amount is required"});
    return;
  }
  showsModel
    .createShow(
      validator.escape(show.title),
      validator.escape(show.location),
      show.photo,
      validator.escape(show.judges),
      validator.escape(show.date),
      show.council,
      validator.escape(show.ticket_price),
      validator.escape(show.ticket_count),
      show.email
    )
    .then((results) => {
      res.status(200).json({ status: "Show Created" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error! Show not created", error });
    });
});

router.patch("/show/update", (req, res) => {
  let show = req.body;
  if (validator.isAscii(show.title) == false) {
    res.status(406).json({warning: "Show title is required"});
    return;
  }
  if (validator.isAscii(show.location) == false) {
    res.status(406).json({warning: "Show location is required"});
    return;
  }
  if (validator.isAscii(show.judges) == false) {
    res.status(406).json({warning: "Show judge is required"});
    return;
  }
  if (validator.isAscii(show.date) == false) {
    res.status(406).json({warning: "Show date is required"});
    return;
  }
  if (validator.isAscii(show.council) == false) {
    res.status(406).json({warning: "Show council is required"});
    return;
  }
  if (validator.isEmpty(show.ticket_price)) {
    res.status(406).json({warning: "Ticket price is required"});
    return;
  }
  if (validator.isEmpty(show.ticket_count)) {
    res.status(406).json({warning: "Ticket amount is required"});
    return;
  }
  showsModel
    .updateShow(
      validator.escape(show.title),
      validator.escape(show.location),
      show.image,
      validator.escape(show.judges),
      validator.escape(show.date),
      show.council,
      validator.escape(show.ticket_price),
      validator.escape(show.ticket_count),
      show.email,
      validator.escape(show.id)
    )
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(200).json({ status: `${show.title} updated` });
      } else {
        res.status(404).json({ warning: `${show.title} not found` });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Query error" + error });
    });
});

router.delete("/show/delete/:id", (req, res) => {
  let id = req.params.id;
  showsModel
    .deleteShow(id)
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(200).json({ status: `Show ${id} has been deleted` });
      } else {
        res.status(404).json({ warning: `Show ${id} not found` });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Query error" + error });
    });
});

module.exports = router;
