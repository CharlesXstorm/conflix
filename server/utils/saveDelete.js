const dotenv = require("dotenv");
dotenv.config({ path: `${__dirname}/../.env` });

const mongoose = require("mongoose");
const Profiles = require("../models/profileIconModel");
const icons = require("../data/profiles.json");

const dataBaseConfig = {
  "<username>": process.env.USER,
  "<password>": process.env.DATABASE_PASSWORD
};
const DB = process.env.DATABASE.replace(
  /<username>|<password>/gi,
  (matched) => {
    return dataBaseConfig[matched];
  }
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Database connected successfully");
  });

// console.log("database", process.env.DATABASE);

const saveFn = async () => {
  try {
    await Profiles.create(icons);
    console.log("successfully created");
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

const deleteFn = async () => {
  try {
    await Profiles.deleteMany();
    console.log("deleted successfully");
    process.exit();
  } catch (err) {
    console.log(err.message);
  }
};

switch (process.argv[2] === "--save") {
  case true:
    return saveFn();
  case false:
    return deleteFn();
  default:
    return;
}
// console.log(process.argv);
