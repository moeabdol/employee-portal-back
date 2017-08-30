const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt  = require("passport-jwt").ExtractJwt;
const User        = require("../models/user");
const config      = require("./config");

module.exports = function(passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithSchema("JWT");
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload._doc._id, (err, user) => {
      if (err) done(err, false);
      if (!user) done(null, false);
      done(null, user);
    });
  }));
};
