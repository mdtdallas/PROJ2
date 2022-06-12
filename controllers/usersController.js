const express = require("express");
const session = require("express-session");
const router = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const usersModel = require("../models/usersModel");
const jwt = require("jsonwebtoken");
const { validateToken } = require("./Auth");
const logModel = require("../models/logModel");
const jwt_secret = process.env.JWT_TOKEN_SECRET;

router.get("/users", async (req, res) => {
  const results = await usersModel.getAllUsers();
  if(!results) res.json({error: 'No Users'});
  res.status(200).json({results, status: 'Users loaded'});
});

router.get('/user/:id', async (req, res) => {
  const results = await usersModel.getUserById(req.params.id);
  if(!results) res.json({warning: 'User not found!'});
  res.json(results);
})

router.get("/users/:email", (req, res) => {
  usersModel
    .getUserByEmail(req.params.email)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.get("/usersName/:name", (req, res) => {
  usersModel
    .getUserByName(req.params.name)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.get("/usersPhone/:phone", (req, res) => {
  usersModel
    .getUserByPhone(req.params.phone)
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed!" });
    });
});

router.post("/users/create", (req, res) => {
  const user = req.body;
  if (validator.isEmail(user.email) === false) {
    res.status(406).json({warning: 'Please enter email'});
    return;
  }
  if (validator.isAscii(user.password) === false) {
    res.status(406).json("Please enter password");
    return;
  }
  if (validator.isAscii(user.name) === false) {
    res.status(406).json("Please enter name");
    return;
  }
  if (validator.isAscii(user.phone) === false) {
    res.status(406).json("Please enter phone number");
    return;
  }
  let hashedPassword = bcrypt.hashSync(user.password, 6);
  usersModel
    .createUser(
      validator.escape(user.email),
      hashedPassword,
      validator.escape(user.name),
      validator.escape(user.phone),
      user.userType,
      user.image
    )
    .then((result) => {
      res.status(200).json({ status: "User Created" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error! User not created" });
    });
});

router.post("/userUpdate", (req, res) => {
  let user = req.body;
  if (validator.isAscii(user.email) === false) {
    res.status(406).json('Please enter email');
    return;
  }
  if (validator.isAscii(user.password) === false) {
      res.status(406).json({warning: 'Please enter password'})
      return;
  }
  if (validator.isAscii(user.name) === false) {
    res.status(406).json({warning: "Please enter name"});
    return;
  }
  if (validator.isAscii(user.phone) === false) {
    res.status(401).json({warning: "Please enter phone number"});
    return;
  }
  let hashedPassword = user.password;
  if (!user.password.startsWith("$2b$")) {
    hashedPassword = bcrypt.hashSync(user.password, 6);
  }
  usersModel
    .updateUser(user.email, hashedPassword, user.name, user.phone, user.image, user.userType, user.id)
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(200).json({ status: `${user.name} has been updated` });
      } else {
        res.status(404).json({ warning: `${user.name} not found` });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: `Failed to update ${user.name}` });
    });
});

router.delete("/userDelete/:id", (req, res) => {
  const { id } = req.params;
  usersModel
    .deleteUser(id)
    .then((results) => {
      if (results.affectedRows > 0) {
        res.status(200).json({ status: "User Deleted" });
      } else {
        res.status(404).json({ warning: "User Not Found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to delete" });
    });
});

router.post("/users/login", (req, res) => {
  let login = req.body;
  if (validator.isAscii(login.email) === false) {
    res.status(406).json({ error: "Please enter email" });
    return;
  }
  if (validator.isAscii(login.password) === false) {
    res.status(406).json({ error: "Please enter password" });
    return;
  }
  if (!login.email) res.json({ error: "Enter email" });
  usersModel
    .getUserByEmail(login.email)
    .then((results) => {
      if (results.length > 0) {
        let user = results[0];
        if (bcrypt.compareSync(login.password, user.password)) {
          req.session.user = {
            email: user.email,
            userType: user.userType,
            name: user.name,
          };
          const accessToken = jwt.sign(
            {
              email: user.email,
              access: user.userType,
            },
            jwt_secret
          );
          logModel.addLog(
            req.ip,
            req.sessionID,
            req.method,
            req.url,
            req.session.user.email,
            req.session.user.userType,
          );
          res.status(200).json({
            status: "Login Successful",
            userType: user.userType,
            accessToken: accessToken,
            email: user.email,
          });
        } else {
          res.status(418).json({ warning: "Im a teapot!" });
        }
      } else {
        res.status(404).json({ warning: "User not found" });
      }
    })
    .catch((error) => {
      res.status(500).json({ error: "Query error", error: error });
    });
});

router.post("/users/logout", (req, res) => {
  req.session.destroy();
  res.status(200).json({ status: "Logged Out" });
});

module.exports = router;
