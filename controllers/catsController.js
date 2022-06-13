const express = require("express");
const router = express.Router();
const catsModel = require("../models/catsModel");
const validator = require("validator");
const { validateToken } = require("./Auth");



router.get("/cats", validateToken, (req, res) => {
  catsModel
    .getAllcats()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.get("/cat/:id", validateToken, (req, res) => {
  let id = req.params.id;
  catsModel
    .getCatsById(id)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!", error });
    });
});

router.get("/catsEmail/:email", validateToken, (req, res) => {
  let email = req.params.email;
  catsModel
    .getCatByEmail(email)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.get("/catsBreed/:breed", validateToken, (req, res) => {
  let breed = req.params.breed;
  catsModel
    .getCatsByBreed(breed)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.get("/catsAge/:age", validateToken, (req, res) => {
  let age = req.params.age;
  catsModel
    .getCatsByAge(age)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.get("/catsBreeder/:breeder", validateToken, (req, res) => {
  let breeder = req.params.breeder;
  catsModel
    .getCatsByBreeder(breeder)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.post("/catCreate/create", validateToken, (req, res) => {
  let cat = req.body;
  //let dateTimeNow = new Date().toISOString();
  let dateTimeNow = new Date().toLocaleDateString("en-AU");
  if (validator.isAscii(cat.name) === false) {
    res.status(406).json({warning: "Please enter cat name"});
  }
  if (validator.isAscii(cat.breed) === false) {
    res.status(406).json({warning: "Please enter cat breed"});
  }
  if (validator.isAscii(cat.age) === false) {
    res.status(406).json({warning: "Please enter cat age"});
  }
  if (validator.isAscii(cat.breeder) === false) {
    res.status(406).json({warning: "Please enter breeder name"});
  }
  catsModel
    .createCat(
      validator.escape(cat.name),
      validator.escape(cat.breed),
      validator.escape(cat.age),
      cat.image,
      validator.escape(cat.breeder),
      cat.email,
      dateTimeNow
    )
    .then((results) => {
      res.status(201).json({ status: `${cat.name} created` });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.patch("/catUpdate/update", validateToken, (req, res) => {
  let dateTimeNow = new Date().toLocaleDateString("en-AU");
  let cat = req.body;
  if (validator.isAscii(cat.name) === false) {
    res.status(406).json({warning: "Please enter cat name"});
    return;
  }
  if (validator.isAscii(cat.breed) === false) {
    res.status(406).json({warning: "Please enter cat breed"});
    return;
  }
  if (validator.isAscii(cat.age) === false) {
    res.status(406).json({warning: "Please enter cat age"});
    return;
  }
  if (validator.isAscii(cat.breeder) === false) {
    res.status(406).json({warning: "Please enter breeder name"});
    return;
  }
  catsModel
    .updateCat(
      validator.escape(cat.name),
      validator.escape(cat.breed),
      validator.escape(cat.age),
      cat.image,
      validator.escape(cat.breeder),
      cat.email,
      dateTimeNow,
      cat.id,
    )
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(202).json({ status: `Cat ${cat.name} has been updated` });
      } else {
        res.status(404).json({ warning: `Cat ${cat.id} not found`, results: results });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

router.delete("/catDelete/delete/:id", validateToken, (req, res) => {
  let id = req.params.id;
  catsModel
    .deleteCat(id)
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(200).json({ status: `${id} deleted` });
      } else {
        res.status(404).json({ warning: `${id} not found` });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Query error ${error}` });
    });
});

module.exports = router;
