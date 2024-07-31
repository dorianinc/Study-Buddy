const chai = require("chai");
const expect = chai.expect;
const bcrypt = require("bcryptjs");
const { sequelize, Note, User, Document } = require("../../db/models");
const { seedDatabase } = require("../seedDB");

// Disable logging for tests
sequelize.options.logging = false;

let user;
let document;
let note;

describe("Note Model", () => {
  before(async () => {
    await sequelize.sync({ force: true });

    // Create a user
    user = await User.create({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@gmail.com",
      username: "janedoe",
      hashedPassword: bcrypt.hashSync("password1", 10),
    });

    // Create a document
    document = await Document.create({
      name: "Document 1",
      authorId: user.id,
      fileUrl: "http://example.com/file.pdf",
      fileType: "pdf",
      summary: "This is a valid summary for the document.",
    });
  });

  beforeEach(async () => {
    note = null;
    await seedDatabase();
  });

  it("01. Should create a note with valid attributes", async () => {
    note = await Note.create({
      authorId: user.id,
      docId: document.id,
      content: "This is a note.",
    });

    expect(note).to.be.an("object");
    expect(note.authorId).to.equal(user.id);
    expect(note.docId).to.equal(document.id);
    expect(note.content).to.equal("This is a note.");
  });

  it("02. Should retrieve all notes for a user", async () => {
    await Note.create({
      authorId: user.id,
      docId: document.id,
      content: "Note 1",
    });

    await Note.create({
      authorId: user.id,
      docId: document.id,
      content: "Note 2",
    });

    const notes = await Note.findAll();

    expect(notes).to.be.an("array").that.has.lengthOf(12);
    expect(notes[10].content).to.be.oneOf(["Note 1", "Note 2"]);
    expect(notes[11].content).to.be.oneOf(["Note 1", "Note 2"]);
  });

  it("03. Should retrieve a note by ID", async () => {
    note = await Note.create({
      authorId: user.id,
      docId: document.id,
      content: "Specific Note",
    });

    const foundNote = await Note.findByPk(note.id);

    expect(foundNote).to.be.an("object");
    expect(foundNote.id).to.equal(note.id);
    expect(foundNote.content).to.equal("Specific Note");
  });

  it("04. Should update a note by ID", async () => {
    note = await Note.create({
      authorId: user.id,
      docId: document.id,
      content: "Old Content",
    });

    note.content = "Updated Content";
    await note.save();

    const updatedNote = await Note.findByPk(note.id);

    expect(updatedNote.content).to.equal("Updated Content");
  });

  it("05. Should delete a note by ID", async () => {
    note = await Note.create({
      authorId: user.id,
      docId: document.id,
      content: "Delete Me",
    });

    await note.destroy();

    const deletedNote = await Note.findByPk(note.id);

    expect(deletedNote).to.be.null;
  });

  it("06. Should not create a note with no authorId", async () => {
    try {
      note = await Note.create({
        authorId: null,
        docId: document.id,
        content: "This is a note.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Author ID is required.");
    } finally {
      expect(note).to.not.exist;
    }
  });

  it("07. Should not create a note with non-integer authorId", async () => {
    try {
      note = await Note.create({
        authorId: "string",
        docId: document.id,
        content: "This is a note.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Author ID must be an integer."
      );
    } finally {
      expect(note).to.not.exist;
    }
  });

  it("08. Should not create a note with no docId", async () => {
    try {
      note = await Note.create({
        authorId: user.id,
        docId: null,
        content: "This is a note.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Document ID is required.");
    } finally {
      expect(note).to.not.exist;
    }
  });

  it("09. Should not create a note with non-integer docId", async () => {
    try {
      note = await Note.create({
        authorId: user.id,
        docId: "string",
        content: "This is a note.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Document ID must be an integer."
      );
    } finally {
      expect(note).to.not.exist;
    }
  });

  it("10. Should not create a note with no content", async () => {
    try {
      note = await Note.create({
        authorId: user.id,
        docId: document.id,
        content: null,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Content is required.");
    } finally {
      expect(note).to.not.exist;
    }
  });

  it("11. Should not create a note with content that is too short", async () => {
    try {
      note = await Note.create({
        authorId: user.id,
        docId: document.id,
        content: "",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Content must be between 1 and 1000 characters long."
      );
    } finally {
      expect(note).to.not.exist;
    }
  });

  it("12. Should not create a note with content that is too long", async () => {
    try {
      note = await Note.create({
        authorId: user.id,
        docId: document.id,
        content: "A".repeat(1001),
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Content must be between 1 and 1000 characters long."
      );
    } finally {
      expect(note).to.not.exist;
    }
  });
});
