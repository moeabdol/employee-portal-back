const express = require("express");
const users = require("../controllers/users");
const router = express.Router();

router.get("/users", users.index);
router.get("/users/:id", users.show);
router.post("/users", users.create);
router.put("/users/:id", users.update);
router.delete("/users/:id", users.destroy);

module.exports = router;
