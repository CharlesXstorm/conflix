const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const Route = require("./routes/routes");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/conflix/users", Route);

module.exports = app;
