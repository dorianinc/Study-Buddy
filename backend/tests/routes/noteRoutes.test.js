const path = require("path");
const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");
const { Note } = require("../../db/models");
const { seedDatabase } = require("../seedDB");

const agent = request.agent(app);
let user;
let xsrfToken;

describe("Note Routes", () => {
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

  it("01. Should create a note with valid attributes", async () => {
    const data = { content: "note 1" };

    const response = await agent
      .post("/api/notes?docId=1")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const note = response.body;

    expect(note).to.be.an("object");
    expect(note.content).to.equal(data.content);
    expect(note.docId).to.equal(1);
  });

  it("02. Should retrieve all notes for a single document", async () => {
    const response = await agent
      .get("/api/notes?docId=1")
      .set("XSRF-Token", xsrfToken);

    const notes = response.body;
    expect(notes).to.be.an("array").that.has.lengthOf(5);
  });

  it("03. Should retrieve a note by ID", async () => {
    const response = await agent
      .get("/api/documents/1")
      .set("XSRF-Token", xsrfToken);

    const document = response.body;
    expect(document).to.be.an("object");
  });

  it("04. Should update a note by ID", async () => {
    const ogNote = await Note.findByPk(1);
    const updatedData = { content: "Updated Content" };

    const response = await agent
      .put(`/api/notes/${ogNote.id}`)
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(updatedData);

    const updatedNote = response.body;

    expect(updatedNote).to.be.an("object");
    expect(updatedNote.content).to.not.equal(ogNote.content);
    expect(response.status).to.equal(200);
  });

  it("05. Should delete a note by ID", async () => {
    const note = await Note.findByPk(1);
    expect(note).to.be.an("object");

    const response = await agent
      .delete(`/api/notes/1`)
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken);

    const deletedNote = await Note.findByPk(note.id);
    expect(deletedNote).to.not.exist;
    expect(response.status).to.equal(200);
  });

  it("06. Should not create a note with content of null", async () => {
    const data = { content: null };

    const response = await agent
      .post("/api/notes?docId=1")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { note, errors } = response.body;

    expect(note).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Content must be between 1 and 1000 characters long."
    );
  });

  it("07. Should not create a note with content that is too short", async () => {
    const data = { content: "" };

    const response = await agent
      .post("/api/notes?docId=1")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { note, errors } = response.body;

    expect(note).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Content must be between 1 and 1000 characters long."
    );
  });

  it("08. Should not create a note with content that is too long", async () => {
    const data = { content: "a".repeat(1001) };

    const response = await agent
      .post("/api/notes?docId=1")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { note, errors } = response.body;

    expect(note).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Content must be between 1 and 1000 characters long."
    );
  });
});
