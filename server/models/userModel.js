const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    required: [true, "A user must have an email"],
    lowercase: true,
    unique: [true, "The email is already registered"],
    validate: [isEmail, "Please enter a valid email"]
  },
  password: {
    type: String,
    trim: true,
    required: [true, "A user must have a password"],
    minlength: [6, "Minimum password length is 6 characters"]
  },
  subProfile: {
    type: Array,
    default: [
      {
        id: 0,
        name: "Add Profile",
        img: "/images/addProfile.svg",
        isProfile: false
      },
      {
        id: 1,
        name: "kids",
        img: "https://dl.dropboxusercontent.com/scl/fi/k2lrec356rb6ecrjlh46c/kids.png?rlkey=t0wwdggp85hj0g562vc6u4apz&dl=0",
        isProfile: true,
        watchList: []
      }
    ]
  },
  createdAt: {
    type: Date,
    default: () => new Date(new Date().getTime() + 60 * 60 * 1000),
    select: false
  }
});

//encrypt password before save
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//create a custom login method on the model to decrypt the password
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    console.log(auth);
    if (auth) {
      return user;
    } else {
      throw Error("incorrect password");
    }
  } else {
    throw Error("This account does not exist");
  }
};

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
