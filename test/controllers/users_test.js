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

  it("GET /api/users/:id should get specific user", (done) => {
    request(app)
      .get("/api/users/:id")
      .send({ id: mohammadId })
      .expect("Content-Type", /json/)
      .expect(200)
      .expect((res) => {
        res.body.username.should.equal("mohammad");
        res.body.email.should.equal("mohd.a.saed@gmail.com");
        res.body.role.should.equal("admin");
      })
      .end(done);
  });

  it("POST /api/users should create a new user", (done) => {
    request(app)
      .post("/api/users")
      .send({
        username: "anwar",
        email: "anwar@axisx.com",
        password: "12345",
        role: "manager"
      })
      .expect("Content-Type", /json/)
      .expect(201)
      .expect((res) => {
        res.body.message.should.equal("User created successfully");
        res.body.user.username.should.equal("anwar");
        res.body.user.email.should.equal("anwar@axisx.com");
        res.body.user.role.should.equal("manager");
        User.count((err, count) => {
          if (err) done(err);
          count.should.equal(3);
        });
      })
      .end(done);
  });

  it("POST /api/users should not create a new username if user already exists",
    (done) => {
      request(app)
        .post("/api/users")
        .send({
          username: "mohammad",
          email: "test@gmail.com",
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
    }
  );

  it("POST /api/users should not create a new user if email already exists",
    (done) => {
      request(app)
        .post("/api/users")
        .send({
          username: "ahmed",
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
    }
  );
});
