process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const mongoose = require("mongoose");
const config = require("../../config");

let User;
try {
  User = mongoose.model("User");
} catch (error) {
  User = require("../../models/user");
}

describe("User model", () => {
  let dummyUser;

  before((done) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.testdb, { useMongoClient: true }, (err) => {
      if (err) { console.log(err); }
      done();
    });
  });

  after((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
    });
    mongoose.disconnect(done);
  });

  beforeEach((done) => {
    dummyUser = new User({
      username: "moeabdol",
      email: "admin.r99@gmail.com",
      password: "12345",
      role: "admin"
    });

    dummyUser.save((err) => {
      if (err) return done(err);
      done();
    });
  });

  it("should find user by username", (done) => {
    User.findByUsername("moeabdol", (err, user) => {
      should.exist(user);
      user.username.should.equal("moeabdol");
      done();
    });
  });
});
