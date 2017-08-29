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

const create = (req, res) => {
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    res.status(201).json({
      user: {
        username: user.username,
        email: user.email,
        role: user.role
      },
      message: "User created successfully"
    });
  });
};

module.exports = {
  index,
  show,
  create
};
