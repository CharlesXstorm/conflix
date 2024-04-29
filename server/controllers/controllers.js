
const User = require("../models/userModel");

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
  try {
    const userQuery = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: userQuery
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const userQuery = await User.create(req.body);
    res.status(201).json({
      status: "success"
    });
  } catch (err) {
    res.status(400).json({
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
