const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_FACTOR = 10;

mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["admin", "hr", "manager", "user"] }
});

UserSchema.statics.findByUsername = function(username, done) {
  this.findOne({ username: username }, (err, user) => {
    if (err) return done(err, false);
    if (!user) return done(null, false);
    done(null, user);
  });
};

module.exports = mongoose.model("User", UserSchema);
