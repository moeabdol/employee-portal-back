const express    = require("express");
const bodyParser = require("body-parser");
// const path       = require("path");
const cors       = require("cors");
const mongoose   = require("mongoose");
const passport   = require("passport");

const app = express();
const port = 3000;

const routes = require("./routes");
const config = require("./config");

mongoose.Promise = global.Promise;
mongoose.connect(config.db, { useMongoClient: true }, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database ", config.db);
  }
});

app.use(cors());
app.use(bodyParser.json());

require("./config/passport")(passport);
app.use(passport.initialize());

app.use("/api", routes);

app.get("*", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("Server started on port ", port);
});
