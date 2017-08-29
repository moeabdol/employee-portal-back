const express = require("express");
const users = require("../controllers/users");
const router = express.Router();

router.get("/users", users.index);
router.get("/users/:id", users.show);

module.exports = router;
