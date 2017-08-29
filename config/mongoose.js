const mongoose = require("mongoose");
const config = require("./index");

mongoose.Promise = global.Promise;

if (process.env.NODE_ENV === "development") {
  mongoose.connect(config.db, { useMongoClient: true }, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to database ", config.db);
    }
  });
} else if (process.env.NODE_ENV === "test") {
  mongoose.connect(config.testdb, { useMongoClient: true }, (err) => {
    if (err) {
      console.log(err);
    }
  });
}

module.exports = mongoose;
