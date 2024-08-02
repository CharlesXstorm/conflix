const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });

const mongoose = require("mongoose");
const app = require("./app");

const databaseConfig = {
  "<username>": process.env.USER,
  "<password>": process.env.DATABASE_PASSWORD
};

const DB = process.env.DATABASE.replace(
  /<username>|<password>/gi,
  (matched) => {
    return databaseConfig[matched];
  }
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Database connected successfully");
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
