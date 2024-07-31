const path = require("path");
const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");
const { sequelize, Document, Folder } = require("../../db/models");
const { seedDatabase } = require("../seedDB");

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
    await seedDatabase();
  });

  it("01. Should create a document with valid attributes", async () => {
    const file = path.join(__dirname, "../../assets/test.pdf");
    const data = { name: "Document 1", fileType: "pdf" };

    const response = await agent
      .post("/api/documents?folderId=1")
      .set("Accept", "multipart/form-data")
      .set("XSRF-Token", xsrfToken)
      .field("name", data.name)
      .field("fileType", data.fileType)
      .field("theFile", file)
      .attach("theFile", file);

    const document = response.body;

    expect(document).to.be.an("object");
    expect(document.name).to.equal(data.name);
    expect(document.fileType).to.equal(data.fileType);
    expect(document.authorId).to.equal(user.id);
    expect(document.folderId).to.equal(1);
    expect(document.summary).to.exist;
  });

  it("02. Should retrieve all documents from a user", async () => {
    const response = await agent
      .get("/api/documents")
      .set("XSRF-Token", xsrfToken);

    const documents = response.body;
    expect(documents).to.be.an("array").that.has.lengthOf(10);
  });

  it("03. Should retrieve a document by ID", async () => {
    const response = await agent
      .get("/api/documents/1")
      .set("XSRF-Token", xsrfToken);

    const document = response.body;
    expect(document).to.be.an("object");
  });

  it("04. Should update a document by ID", async () => {
    const ogDoc = await Document.findByPk(1);
    const updatedData = { name: "Updated Doc", summary: "Updated Summary" };

    const response = await agent
      .put(`/api/documents/${ogDoc.id}`)
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(updatedData);

    const updatedDoc = response.body;

    expect(updatedDoc).to.be.an("object");
    expect(updatedDoc.name).to.not.equal(ogDoc.name);
    expect(updatedDoc.summary).to.not.equal(ogDoc.summary);
    expect(response.status).to.equal(200);
  });

  it("05. Should delete a document by ID", async () => {
    const doc = await Document.findByPk(1);
    expect(doc).to.be.an("object");

    const response = await agent
      .delete(`/api/documents/${doc.id}`)
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken);

    const deletedDoc = await Document.findByPk(doc.id);
    expect(deletedDoc).to.not.exist;
    expect(response.status).to.equal(200);
  });

  it("06. Should not create a document when the name is null", async () => {
    const file = path.join(__dirname, "../../assets/test.pdf");
    const data = { name: null, fileType: "pdf" };

    const response = await agent
      .post("/api/documents?folderId=1")
      .set("Accept", "multipart/form-data")
      .set("XSRF-Token", xsrfToken)
      .field("fileType", data.fileType)
      .attach("theFile", file);

    const { doc, errors } = response.body;

    expect(doc).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Document name must be between 1 and 25 characters long."
    );
  });

  it("07. Should not create a document when the name is an empty string", async () => {
    const file = path.join(__dirname, "../../assets/test.pdf");
    const data = { name: "", fileType: "pdf" };

    const response = await agent
      .post("/api/documents?folderId=1")
      .set("Accept", "multipart/form-data")
      .set("XSRF-Token", xsrfToken)
      .field("name", data.name)
      .field("fileType", data.fileType)
      .attach("theFile", file);

    const { doc, errors } = response.body;

    expect(doc).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Document name must be between 1 and 25 characters long."
    );
  });

  it("08. Should not create a document with too long of a name", async () => {
    const file = path.join(__dirname, "../../assets/test.pdf");
    const data = { name: "a".repeat(26), fileType: "pdf" };

    const response = await agent
      .post("/api/documents?folderId=1")
      .set("Accept", "multipart/form-data")
      .set("XSRF-Token", xsrfToken)
      .field("name", data.name)
      .field("fileType", data.fileType)
      .attach("theFile", file);

    const { doc, errors } = response.body;

    expect(doc).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Document name must be between 1 and 25 characters long."
    );
  });

  it("09. Should not create a document with no file", async () => {
    const file = path.join(__dirname, "../../assets/test.docx");
    const data = { name: "Document 1", fileType: "docx" };

    const response = await agent
      .post("/api/documents?folderId=1")
      .set("Accept", "multipart/form-data")
      .set("XSRF-Token", xsrfToken)
      .field("name", data.name)
      .field("fileType", data.fileType)
      .attach("theFile", file);

    const { doc, errors } = response.body;

    expect(doc).to.not.exist;
    expect(Object.values(errors)[0]).to.equal("File is required.");
  });

  it("10. Should not create a document with an invalid file type", async () => {
    const file = path.join(__dirname, "../../assets/test.docx");
    const data = { name: "Document 1", fileType: "docx" };

    const response = await agent
      .post("/api/documents?folderId=1")
      .set("Accept", "multipart/form-data")
      .set("XSRF-Token", xsrfToken)
      .field("name", data.name)
      .field("fileType", data.fileType)
      .field("theFile", file)
      .attach("theFile", file);

    const { doc, errors } = response.body;

    expect(doc).to.not.exist;
    expect(Object.values(errors)[0]).to.equal("File type must be pdf.");
  });
});
