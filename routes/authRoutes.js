const express = require("express");
const router = express.Router();
const {
  register,
  login,
  getCurrentUser,
} = require("../controllers/auth-controllers");

const checkAuth = require("../middleware/auth");

router.post("/register", register);

router.post("/login", login);

router.use(checkAuth);

router.get("/currentUser", getCurrentUser);

module.exports = router;
