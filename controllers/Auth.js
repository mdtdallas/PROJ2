
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
      process.env.JWT_TOKEN_SECRET
    );
    if (validToken) {
      return next();
    }
  } catch (err) {
    return res.json({ error: 'Unauthorized!'})
  }
};

module.exports = { validateToken };
