const mongoose = require("mongoose");

const profileIconSchema = new mongoose.Schema({
  title: {
    type: Object
  },
  src: {
    type: Array
  }
});

const profileIconModel = mongoose.model("profileIcon", profileIconSchema);

module.exports = profileIconModel;
