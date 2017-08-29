const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const SALT_FACTOR = 10;

const UserSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ["admin", "hr", "manager", "user"] }
});

module.exports = mongoose.model("User", UserSchema);
