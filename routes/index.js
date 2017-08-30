const express  = require("express");
const users    = require("../controllers/users");
const router   = express.Router();
const passport = require("passport");

router.post("/users/register", users.register);
router.post("/users/authenticate", users.authenticate);
router.get("/users",
  passport.authenticate("jwt", { session: false }),
  users.index);
router.get("/users/:id",
  passport.authenticate("jwt", { session: false }),
  users.show);
router.put("/users/:id",
  passport.authenticate("jwt", { session: false }),
  users.update);
router.delete("/users/:id",
  passport.authenticate("jwt", { session: false }),
  users.destroy);

module.exports = router;
