const express = require("express");
const Router = express.Router();

const {requireAuth} = require('../middlewares/authMiddleware')

const {getAllUsers,
    getUser,
    signUp,
    login,
    updateUser,
    deleteUser,
    getAllSubProfiles,
    createSubProfile,
    updateSubProfile,
    deleteSubProfile} = require("../controllers/controllers");


//user routes
Router.route("/")
.get(getAllUsers)

Router.route("/signup")
.post(signUp)

Router.route('/login')
.post(login)

Router.route('/auth')
.get(requireAuth,getUser)

Router.route("/:id")
.patch(updateUser)
.delete(deleteUser);

//subProfile routes
Router.route("/:id/subProfiles")
.get(getAllSubProfiles)
.post(createSubProfile,updateUser)

Router.route('/:id/subProfiles/:subId')
.patch(updateSubProfile,updateUser)
.delete(deleteSubProfile,updateUser)


module.exports = Router;
