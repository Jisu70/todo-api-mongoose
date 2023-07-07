
// Dependencies
const jwt = require("jsonwebtoken");

/**
 * checkLogin middleware function is responsible for extracting, verifying, and decoding a JWT token from the authorization header of an incoming request
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const checkLogin = (req, res, next) => {
  const { authorization } = req.headers;

  try {
    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { username, userId } = decoded;
    req.username = username;
    req.userId = userId;
    next();
  } catch (error) {
    next("Authorization failure!!");
  }
};

module.exports = checkLogin;
