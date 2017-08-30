process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const mongoose = require("../../config/mongoose");
const User = mongoose.model("User");

describe("Users Controller", () => {
  let mohammad, abdelgadir, mohammadId;

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

    mohammad.save((err, user) => {
      if (err) return done(err);
      mohammadId = user._id;
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

  it("Post /api/users/register with valid credintials should register new " +
    "user", (done) => {
    request(app)
      .post("/api/users/register")
      .send({
        username: "anwar",
        email: "anwar@axisx.com",
        password: "12345",
        role: "manager"
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .expect((res) => {
        res.body.message.should.equal("Resource created successfully");
        res.body.username.should.equal("anwar");
        res.body.email.should.equal("anwar@axisx.com");
        res.body.role.should.equal("manager");
        User.count((err, count) => {
          if (err) done(err);
          count.should.equal(3);
        });
      })
      .end(done);
  });

  it("Post /api/users/register with invalid credintials should not register " +
   " new  user", (done) => {
    request(app)
      .post("/api/users/register")
      .send({
        username: "",
        email: "",
        password: "12345",
        role: "manager"
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .expect((res) => {
        res.body.message.should.equal("Something went wrong!");
        User.count((err, count) => {
          if (err) done(err);
          count.should.equal(3);
        });
      })
      .end(done);
  });

  it("Post /api/users/register should not register existing user", (done) => {
    request(app)
      .post("/api/users/register")
      .send({
        username: "mohammad",
        email: "mohd.a.saed@gmail.com",
        password: "12345",
        role: "manager"
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .expect((res) => {
        res.body.message.should.equal("Something went wrong!");
        User.count((err, count) => {
          if (err) done(err);
          count.should.equal(3);
        });
      })
      .end(done);
  });

  it("GET /api/users should get all users", (done) => {
    request(app)
      .get("/api/users")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.length.should.equal(3);
      })
      .end(done);
  });

  it("GET /api/users/:id should get specific user", (done) => {
    request(app)
      .get(`/api/users/${mohammadId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.username.should.equal("mohammad");
        res.body.email.should.equal("mohd.a.saed@gmail.com");
        res.body.role.should.equal("admin");
      })
      .end(done);
  });

  it("PUT /api/users/:id should update existing user", (done) => {
    request(app)
      .put(`/api/users/${mohammadId}`)
      .send({
        email: "admin.r99@gmail.com",
        role: "hr"
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.message.should.equal("Resource updated successfully");
        res.body.username.should.equal("mohammad");
        res.body.email.should.equal("admin.r99@gmail.com");
        res.body.role.should.equal("hr");
        User.count((err, count) => {
          if (err) done(err);
          count.should.equal(3);
        });
      })
      .end(done);
  });

  it("PUT /api/users/:id should not update non-existant user", (done) => {
    request(app)
      .put("/api/users/12345")
      .send({
        email: "admin.r99@gmail.com",
        role: "hr"
      })
      .expect("Content-Type", /json/)
      .expect(500)
      .expect((res) => {
        res.body.message.should.equal("Something went wrong!");
      })
      .end(done);
  });

  it("DELETE /api/users/:id should destroy user", (done) => {
    request(app)
      .delete(`/api/users/${mohammadId}`)
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.message.should.equal("Resource deleted successfully");
        User.count((err, count) => {
          if (err) done(err);
          count.should.equal(2);
        });
      })
      .end(done);
  });

  it("DELETE /api/users/:id should not destroy non-existant user", (done) => {
    User.findByIdAndRemove(mohammadId);
    request(app)
      .delete(`/api/users/${mohammadId}`)
      .expect("Content-Type", /json/)
      .expect(400)
      .expect((res) => {
        res.body.message.should.equal("Resource not found!");
      })
      .end(done);
  });
});
