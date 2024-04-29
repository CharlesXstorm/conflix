const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  user: {
    type: String,
    trim: true,
    require: [true, "A user must have a name"],
    unique: [true, "The username already existed"]
  },
  password: {
    type: String,
    trim: true,
    require: [true, "A user must have a password"]
  },
  subProfile: {
    type: Array,
    default: [
      {
        id: 0,
        name: "kids",
        img: "https://dl.dropboxusercontent.com/scl/fi/k2lrec356rb6ecrjlh46c/kids.png?rlkey=t0wwdggp85hj0g562vc6u4apz&dl=0",
        isProfile: true,
        wishList: []
      },
      {
        id: 1,
        name: "Add Profile",
        img: "images/addProfile.svg",
        isProfile: false
      }
    ]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
