const User = require("../models/user");

const index = (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    res.status(200).json(users);
  });
};

module.exports = {
  index
};
