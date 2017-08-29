process.env.NODE_ENV = "test";

const app = require("../../app");
const chai = require("chai");

describe("hello world", () => {
  it("should print hello world", (done) => {
    console.log("hello world");
    done();
  });
});
