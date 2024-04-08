const express = require("express");
const router = express.Router();
const {
  createAnime,
  getUserAnimes,
  deleteAnime,
} = require("../controllers/anime-controllers");

const checkAuth = require("../middleware/auth");

router.use(checkAuth);

router.post("/", createAnime);

router.get("/", getUserAnimes);

router.delete("/:id", deleteAnime);

module.exports = router;
