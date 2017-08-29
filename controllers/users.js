const User = require("../models/user");

const index = (req, res) => {
  User.find((err, users) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    res.status(200).json(users);
  });
};

const show = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    if (!user) return res.status(404).json({ message: "Resource not found!" });

    res.status(200).json({
      username: user.username,
      email: user.email,
      role: user.role
    });
  });
};

const create = (req, res) => {
  let user = new User(req.body);
  user.save((err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });

    res.status(201).json({
      username: user.username,
      email: user.email,
      role: user.role,
      message: "Resource created successfully"
    });
  });
};

const update = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    if (!user) return res.status(404).json({ message: "User not found!" });

    if (req.body.username) user.username = req.body.username;
    if (req.body.email) user.email = req.body.email;
    if (req.body.role) user.role = req.body.role;

    user.save((err, user) => {
      if (err) {
        return res.status(500).json({
          message: "Something went wrong!"
        });
      }

      res.status(200).json({
        username: user.username,
        email: user.email,
        role: user.role,
        message: "Resource updated successfully"
      });
    });
  });
};

const destroy = (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) return res.status(500).json({ message: "Something went wrong!" });
    res.status(200).json({ message: "Resource deleted successfully" });
  });
};

module.exports = {
  index,
  show,
  create,
  update,
  destroy
};
