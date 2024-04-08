const AnimeModel = require("../models/AnimeModel");
const { StatusCodes } = require("http-status-codes");

const createAnime = async (req, res) => {
  const userId = req.userData.userId;
  console.log(req.body);
  const anime = await AnimeModel.create({ ...req.body, createdBy: userId });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Anime is successfully added to Watchlist" });
};

const getUserAnimes = async (req, res) => {
  const userId = req.userData.userId;
  const total = await AnimeModel.find({ createdBy: userId });
  let animes = AnimeModel.find({ createdBy: userId });
  console.log(req.query);
  const page = Number(req.query.page) || 1;
  const limit =
    Number(req.query.limit) || req.query.limit === "all" ? total.length : 10;
  const skip = (page - 1) * limit;
  animes = animes.skip(skip).limit(limit);
  const result = await animes;
  res.status(StatusCodes.OK).json({ result, total: total.length });
};

const deleteAnime = async (req, res) => {
  const id = req.params.id;
  const anime = await AnimeModel.findOne({ animeId: id });
  await anime.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Anime deleted" });
};

module.exports = { createAnime, getUserAnimes, deleteAnime };
