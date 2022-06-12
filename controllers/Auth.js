
// This is the JWT verification middleware. 

const { verify } = require("jsonwebtoken");

const validateToken = (req, res, next) => {
    // Receives token from headers
  const accessToken = req.header("accessToken");
  // Checks if token exists - if not send message
  if (!accessToken) res.json({ error: "User not logged in" });
  try {
      // Use the received token and object and compare them with the orinigal key
    const validToken = verify(
      accessToken,
      "10858bd0d580adf587b7459da186c56b7e96b75b00692eb03516d209f1fc45f9695f196de7734c7dcf8fe3172e2a99e38a3d0cd6f226a9a5d87d2aa45410a454"
    );
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: 'Unauthorized!'})
  }
};

module.exports = { validateToken };
