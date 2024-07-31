const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");
const { Folder } = require("../../db/models");

const agent = request.agent(app);
let user;
let xsrfToken;

describe("Folder Routes", () => {
  before(async () => {
    const data = {
      credential: "demo_user123",
      password: "password1",
    };

    let response = await agent.get("/api/csrf/restore");
    xsrfToken = response.body["XSRF-TOKEN"];

    response = await agent
      .post("/api/session")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    user = response.body.user;
  });

  beforeEach(async () => {
    await Folder.truncate({ cascade: true });
  });

  it("Should create a folder with valid attributes", async () => {
    const data = { name: "New Folder", category: "General" };

    const response = await agent
      .post("/api/folders")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const folder = response.body;

    expect(folder).to.be.an("object");
    expect(folder.name).to.equal(data.name);
    expect(folder.category).to.equal(data.category);
    expect(response.status).to.equal(201);
  });

  it("Should create and retrieve folders with all valid categories for a user", async () => {
    const data = [
      { name: "New Folder 1", category: "General", userId: user.id },
      { name: "New Folder 2", category: "Math", userId: user.id },
      { name: "New Folder 3", category: "Science", userId: user.id },
      { name: "New Folder 4", category: "History", userId: user.id },
      { name: "New Folder 5", category: "Literature", userId: user.id },
    ];
    await Folder.bulkCreate(data);

    const response = await agent
      .get("/api/folders")
      .set("XSRF-Token", xsrfToken);

    const folders = response.body;

    expect(folders).to.be.an("array").that.has.lengthOf(5);
    expect(response.status).to.equal(200);
  });

  it("Should retrieve a folder by ID", async () => {
    const data = { name: "New Folder 1", category: "General", userId: user.id };
    const newFolder = await Folder.create(data);

    const response = await agent
      .get(`/api/folders/${newFolder.id}`)
      .set("XSRF-Token", xsrfToken);

    const folder = response.body;

    expect(folder).to.be.an("object");
    expect(response.status).to.equal(200);
  });

  it("Should update a folder by ID", async () => {
    const originalData = {
      name: "New Folder 1",
      category: "General",
      userId: user.id,
    };
    const updatedData = { name: "New Folder 2", category: "Math" };
    const newFolder = await Folder.create(originalData);

    const response = await agent
      .put(`/api/folders/${newFolder.id}`)
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(updatedData);

    const updatedFolder = response.body;

    expect(updatedFolder).to.be.an("object");
    expect(updatedFolder.name).to.not.equal(originalData.name);
    expect(updatedFolder.category).to.not.equal(originalData.category);
    expect(updatedFolder.name).to.equal(updatedData.name);
    expect(updatedFolder.category).to.equal(updatedData.category);
    expect(response.status).to.equal(200);
  });

  it("Should delete a folder by ID", async () => {
    const data = { name: "New Folder 1", category: "General", userId: user.id };
    const folder = await Folder.create(data);

    expect(folder).to.be.an("object");
    const response = await agent
      .delete(`/api/folders/${folder.id}`)
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken);

    const deletedFolder = await Folder.findByPk(folder.id);
    expect(deletedFolder).to.not.exist;
    expect(response.status).to.equal(200);
  });
});
