const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");

describe("Folder Routes", async () => {
  it("Get all user folders", async () => {
    const response = await request(app).get("/api/folders");
    const folders = response.body;

    expect(folders).to.be.an("array").that.has.lengthOf(5);
    expect(response.status).to.equal(200);
  });
});
