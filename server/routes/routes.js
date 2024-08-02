const express = require("express");
const Router = express.Router();

const { requireAuth } = require("../middlewares/authMiddleware");

const {
  getAllBrowse,
  getAllTvshows,
  getAllMovies,
  getAllKids,
  getAllTvKids,
  getAllMoviesKids
} = require("../controllers/controllers_movies");

const {
  getAllUsers,
  getUser,
  signUp,
  login,
  logOut,
  updateUser,
  deleteUser,
  getAllSubProfiles,
  getSubProfile,
  createSubProfile,
  updateSubProfile,
  deleteSubProfile,
  getAllWatchList,
  addWatchList,
  getProfileIcons
} = require("../controllers/controllers");

//user routes
Router.route("/").get(getAllUsers);

Router.route("/signup").post(signUp);

Router.route("/login").post(login);

Router.route("/logout").post(logOut);

Router.route("/auth").get(requireAuth, getUser);

Router.route("/:id").patch(updateUser).delete(deleteUser);

//subProfile routes
Router.route("/:id/subProfiles")
  .get(getAllSubProfiles)
  .post(createSubProfile, updateUser);

Router.route("/:id/subProfiles/:subId")
  .patch(updateSubProfile, updateUser)
  .delete(deleteSubProfile, updateUser);

//watchlist Routes
Router.route("/:id/subProfiles/:subId/watchlist")
  .get(getSubProfile, getAllWatchList)
  .post(getSubProfile, addWatchList, updateSubProfile, updateUser);

//profile Icons Routes
Router.route("/profileIcons").get(getProfileIcons);

//movie routes
Router.route("/browse").post(getAllBrowse);

Router.route("/browse/genre/tv_shows").post(getAllTvshows);
Router.route("/browse/genre/movies").post(getAllMovies);
Router.route("/browse/kids").post(getAllKids);
Router.route("/browse/kids/tv").post(getAllTvKids);
Router.route("/browse/kids/movies").post(getAllMoviesKids);

module.exports = Router;
