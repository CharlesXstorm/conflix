const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const Route = require("./routes/routes");
const movieRoute = require("./routes/routes_movies");
const { headerAuth } = require("./middlewares/authMiddleware");

const app = express();

// res.header("Access-Control-Allow-Origin", "*");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );

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
app.use("/api/v1/conflix/browse", movieRoute);

module.exports = app;
