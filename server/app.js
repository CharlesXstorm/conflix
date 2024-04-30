const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const Route = require("./routes/routes");
const {headerAuth} = require('./middlewares/authMiddleware')

const app = express();

// res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use(headerAuth)

app.use("/api/v1/conflix/users", Route);

module.exports = app;
