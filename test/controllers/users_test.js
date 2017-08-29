process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const mongoose = require("../../config/mongoose");
const User = mongoose.model("User");

describe("Users Controller", () => {
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

  it("GET /api/users should get all users", (done) => {
    request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.length.should.equal(2);
      })
      .end(done);
  });
});
