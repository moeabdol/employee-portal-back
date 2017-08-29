process.env.NODE_ENV = "test";

const chai = require("chai");
const should = chai.should();
const mongoose = require("../../config/mongoose");
const User = mongoose.model("User");

describe("User model", () => {
  let mohammad, abdelgadir;

  before((done) => {
    mohammad = new User({
      username: "mohammad",
      email: "mohd.a.saed@gmail.com",
      password: "12345",
      role: "admin"
    });

    abdelgadir = new User({
      username: "abdelgadir",
      email: "abdelgadir@axisx.com",
      password: "12345",
      role: "hr"
    });

    mohammad.save((err) => {
      if (err) return done(err);
    });

    abdelgadir.save((err) => {
      if (err) return done(err);
    });

    done();
  });

  after((done) => {
    User.remove({}, (err) => {
      if (err) console.log(err);
    });
    done();
  });

  it("should return the correct number of users", (done) => {
    User.count((err, count) => {
      if (err) done(err);
      count.should.equal(2);
      done();
    });
  });

  it("should find specific user by username", (done) => {
    User.findByUsername("mohammad", (err, user) => {
      if (err) done(err);
      should.exist(user);
      user.username.should.equal("mohammad");
      user.email.should.equal("mohd.a.saed@gmail.com");
      user.role.should.equal("admin");
      done();
    });
  });

  it("should find specific user by email", (done) => {
    User.findByEmail("abdelgadir@axisx.com", (err, user) => {
      if (err) done(err);
      should.exist(user);
      user.username.should.equal("abdelgadir");
      user.email.should.equal("abdelgadir@axisx.com");
      user.role.should.equal("hr");
      done();
    });
  });
});
