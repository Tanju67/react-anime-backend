require("dotenv").config();
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const checkAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError(
      "Please provide a valid username and password"
    );
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.userData = { userId: decoded.userId, username: decoded.name };
    next();
  } catch (error) {
    throw new UnauthenticatedError(
      "Please provide a valid username and password"
    );
  }
};

module.exports = checkAuth;
