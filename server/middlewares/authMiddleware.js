const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "../config.env" });

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check if the token exists & verify it
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          data: null
        });
      }

      req.params.id = decodedToken.id;
      next();
    });
  } else {
    res.status(400).json({
      status: "fail",
      data: null
    });
  }
};
