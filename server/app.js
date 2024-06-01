const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Route = require("./routes/routes");
const { headerAuth } = require("./middlewares/authMiddleware");

const app = express();

// CORS configuration
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  "Access-Control-Allow-Credentials": true,
  credentials: true,
  optionsSuccessStatus: 204
};

// Enable CORS with the above options
app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());
app.use(headerAuth);
app.use(morgan("dev"));

app.use("/api/v1/conflix/users", Route);

module.exports = app;
