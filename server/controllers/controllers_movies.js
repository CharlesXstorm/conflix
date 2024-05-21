const dotenv = require("dotenv");
const axios = require('axios')

dotenv.config({ path: "../.env" });

const config = {
  body:"",
  header: {
    Authorization: `${process.env.TMDB_AUTH}`
  }
}

const url = process.env.TMDB_URL



exports.getAllBrowse = async (req, res) => {

  try {
    const response = await 
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


