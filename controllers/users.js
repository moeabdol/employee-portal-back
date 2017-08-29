const User = require("../models/user");

const index = (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    res.status(200).json(users);
  });
};

const show = (req, res) => {
  User.findById(req.body.id, (err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    if (!user) return res.status(404).json({ message: "Resource not found!" });
    res.status(200).json(user);
  });
};

module.exports = {
  index,
  show
};
