const express = require("express");
const session = require("express-session");
const server = express();
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();
const slowDown = require("express-slow-down");
const bodyParser = require("body-parser");
const db = require("./db");
const logModel = require("./models/logModel");
const secret_key = process.env.SESSION_TOKEN_SECRET;

server.use(cors({ origin: "*" }));

// get IPs from the database push to new array
// let validIps = ["::1"]; // Put your IP whitelist in this array
// function ipgetter() {
//   db.query("SELECT ip FROM iplist"),
//     function (error, results) {
//       if (!results) {
//         return;
//       } else {
//         validIps.push(results);
//       }
//     };
// }

// // // Custom Middleware assuming your using express and express sessions
// server.use((req, res, next) => {
//   ipgetter();
//   if (validIps.includes(req.ip)) {
//     // IP is ok, so go on
//     console.log("IP ok");
//     if (req.ip) {
//       //console.log("Old mate is in!")
//       next();
//     } else {
//       //console.log("Nice try bud")
//       return;
//     }
//   } else {
//     // Invalid ip
//     //console.log("Bad IP: " + req.ip);
//     return;
//   }
// });

server.use(express.static("landing"));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use(
  session({
    secret: secret_key,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

// Here the rate limiter is set 10ms * 100ms to equal 1000ms or 1 second
// then max is set to 1 request per 1 second
const speedLimiter = slowDown({
  windowMs: 500, // 1 second
  delayAfter: 1, // allow 1 requests per 1 second, then...
  delayMs: 500, // begin adding 500ms of delay per request above 100:
  // request # 101 is delayed by  500ms
});

//  apply limiter to all requests
server.use(speedLimiter);

// Here the limiter is set to 24 * 60 * 60 * 1000 to equal 86400000ms or 24 hours
// then the max is set to 1000 requests over the 24 hours
const limiter = rateLimit({
  windowMs: 24 * 60 * 60 * 500,
  max: 1000,
  message: "You have reached your limit of requests",
});

server.use(limiter);

server.use((req, res, next) => {
  let userLoggedIn = req.session.user != null;
  if (userLoggedIn) {
    console.log(req.session.user.email, req.session.user.userType)
  } else {
    console.log(`${req.ip} ${req.method} ${req.sessionID} ${req.url}`);
    
  }
  next();
});

// Here if a user is logged in the middleware will use to either log the
// users actions and if not logged in some actions are logged
// This will check for a pre existing session
server.use((req, res, next) => {
  const userLoggedIn = req.session.user != null;
  if (userLoggedIn) {
    logModel.addLog(
      req.ip,
      req.sessionID,
      req.method,
      req.url,
      req.session.user.email,
      req.session.user.userType
    );
    next();
  } else {
    logModel.addLog(req.ip, req.sessionID, req.method, req.url);
    next();
  }
});

// server.get("/", (req, res) => {
//   res.redirect("index.html");
// });

// Here is where the server checks all the controllers and sends the request to the
// correct controller, model and then to the database
const catsController = require("./controllers/catsController");
server.use("/api", catsController);

const entrantsController = require("./controllers/entrantsController");
server.use("/api", entrantsController);

const showsController = require("./controllers/showsController");
server.use("/api", showsController);

const usersController = require("./controllers/usersController");
server.use("/api", usersController);

const awardsController = require("./controllers/awards");
server.use("/awards", awardsController);

const logController = require("./controllers/logController");
server.use("/logs", logController);

server.post("/allowIP", (req, res) => {
  const { ip, access, email } = req.body;
  logModel.addAllowIP(ip, access, email);
  if (res.rowsAffected === 0) res.json({ error: "Failed!" });
  res.status(200).json({ status: "Added to allowed IP list" });
});

server.post("/denyIP", (req, res) => {
  const { ip, access, email } = req.body;
  logModel.addDenyIP(ip, access, email);
  res.json({ status: "Added to blocked IP list" });
});

server.get("/logs", (req, res) => {
  logModel.getAllLogs().then((results) => {
    res.status(200).json(results);
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`%c Server running ${PORT}`, "color: green");
});
