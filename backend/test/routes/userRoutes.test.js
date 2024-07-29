const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");

const agent = request.agent(app);
let xsrfToken;

describe("User Routes", async () => {
  it("Should get CSRF token", async () => {
    const { body, status } = await agent.get("/api/csrf/restore");
    xsrfToken = body["XSRF-TOKEN"];

    expect(status).to.equal(201);
  });

  it("Should login user", async () => {
    const response = await agent
      .post("/api/session")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send({
        credential: "demo_user123",
        password: "password1",
      });

    console.log("🖥️  headers: ", response.headers);
    console.log("🖥️  body: ", response.body);

    expect(response.status).to.equal(200);
  });
});
