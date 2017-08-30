const express    = require("express");
const bodyParser = require("body-parser");
const cors       = require("cors");
const passport   = require("passport");
const routes     = require("./routes");
const app        = express();
const port       = 3000;

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "development";
}

require("./config/mongoose");

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

module.exports = app;
