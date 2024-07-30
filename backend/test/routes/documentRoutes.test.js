const path = require("path");
const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");
const { Document, Folder } = require("../../db/models");

const agent = request.agent(app);
let user;
let xsrfToken;

describe("Document Routes", () => {
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
    await Document.truncate({ cascade: true });
  });

  it("01. Should create a document with valid attributes", async () => {
    const file = path.join(__dirname, "../../assets/test.pdf");
    const data = { name: "Document 1", fileType: "pdf" };
    const folder = await Folder.create({
      name: "Folder 1",
      userId: user.id,
      category: "Math",
    });

    const response = await agent
      .post(`/api/documents?folderId=${folder.id}`)
      .set("Accept", "multipart/form-data")
      .set("XSRF-Token", xsrfToken)
      .field("name", data.name)
      .field("fileType", data.fileType)
      .attach("theFile", file);

    const document = response.body;

    expect(document).to.be.an("object");
    expect(document.name).to.equal(data.name);
    expect(document.fileType).to.equal(data.fileType);
    expect(document.authorId).to.equal(user.id);
    expect(document.folderId).to.equal(folder.id);
    expect(document.summary).to.exist;
  });
});
