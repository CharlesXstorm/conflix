const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "../.env" });

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  //check if the token exists & verify it
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(400).json({
          status: "fail",
          data: false
        });
      }

      req.params.id = decodedToken.id;
      next();
    });
  } else {
    res.status(400).json({
      status: "fail",
      data: false
    });
  }
};

exports.headerAuth = async (req, res, next) => {
  //sign the jwt to be used for authorization.

  // const authToken = jwt.sign({domain:'/api/v1/conflix'}, process.env.JWT_SECRET);
  //   return res.status(200).json({
  //     authToken
  //   })

  //the generated authToken is then used as the value for header authorization as follows:
  // authorization: "Bearer authToken"

  try {
    const authHeader = await req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
          throw Error("Invalid API authorization key");
        } else {
          next();
        }
      });
    } else {
      throw Error("API Authorization failed");
    }
  } catch (err) {
    res.status(401).json({
      status: "fail",
      message: err.message
    });
  }
};
