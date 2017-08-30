const express = require("express");
const users = require("../controllers/users");
const router = express.Router();

router.post("/users/register", users.register);
router.post("/users/authenticate", users.authenticate);
router.get("/users", users.index);
router.get("/users/:id", users.show);
router.put("/users/:id", users.update);
router.delete("/users/:id", users.destroy);

module.exports = router;
