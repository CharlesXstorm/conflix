const express = require("express");
const Router = express.Router();

const controller = require("../controllers/controllers");

Router.route("/")
.get(controller.getAllUsers)
.post(controller.createUser);

Router.route("/:id")
.get(controller.getUser)
.patch(controller.updateUser);

module.exports = Router;
