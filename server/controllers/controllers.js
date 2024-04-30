const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

dotenv.config({ path: "../config.env" });

//create jsonwebtoken
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge
  });
};

exports.login = async (req, res) => {
  //login user
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({
      status: "success",
      data: user._id
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.signUp = async (req, res) => {
  //signUp user
  try {
    const user = await User.create(req.body);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({
      status: "success",
      data: user._id
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const userQuery = await User.find();
    res.status(200).json({
      status: "success",
      result: userQuery.length,
      data: userQuery
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getUser = async (req, res) => {
  //get user after authentication
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: user
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userQuery = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    res.status(200).json({
      status: "success",
      data: userQuery
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success"
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

//subProfile controllers

exports.getAllSubProfiles = async (req, res) => {
  try {
    const userQuery = await User.findById(req.params.id);
    let subQuery = userQuery.subProfile;
    if (subQuery.length > 5) {
      subQuery = subQuery.filter((item) => item.id != 0);
    }
    res.status(200).json({
      status: "success",
      result: subQuery.length,
      data: subQuery
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.createSubProfile = async (req, res, next) => {
  try {
    const userQuery = await User.findById(req.params.id);
    const subQuery = userQuery.subProfile;

    // add default properties to the subProfile
    const profile = { ...req.body };
    profile.id = subQuery.length;
    profile.isProfile = true;
    profile.wishList = [];

    // add the profile to the subQuery
    subQuery.push(profile);

    //update the document with the subQuery
    req.body = { subProfile: subQuery };

    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.updateSubProfile = async (req, res, next) => {
  try {
    const userQuery = await User.findById(req.params.id);
    const subQuery = userQuery.subProfile;

    // filter the specific subProfile by :subid and update with request body
    const subId = req.params.subId;
    let [subProfile] = subQuery.filter((item) => item.id == subId);
    subProfile = { ...subProfile, ...req.body };

    //update the list of subProfiles with the new updated subProfile
    const newSubQuery = subQuery.map((item) =>
      item.id == subId ? subProfile : item
    );

    //update the document with the new subQuery
    req.body = { subProfile: newSubQuery };

    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};

exports.deleteSubProfile = async (req, res, next) => {
  try {
    const userQuery = await User.findById(req.params.id);
    const subQuery = userQuery.subProfile;

    //exclude subProfile having an id of :subId
    const subId = req.params.subId;
    let filterSubQuery = subQuery
      .filter((item) => item.id != subId)
      .map((item, index) => {
        if (item.id > 1) {
          item.id = index;
        }
        return item;
      });

    //update the document with the filtered subQuery
    req.body = { subProfile: filterSubQuery };

    next();
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err
    });
  }
};
