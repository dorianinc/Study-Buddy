const chai = require("chai");
const expect = chai.expect;
const { sequelize, User, Document } = require("../../db/models");
const { seedDatabase } = require("../seedDB");

// Disable logging for tests
sequelize.options.logging = false;

let user;

describe("Document Model", () => {
  before(async () => {
    user = await User.findByPk(10);
  });

  beforeEach(async () => {
    await seedDatabase();
  });

  it("01. Should create a document with valid attributes", async () => {
    let document = await Document.create({
      name: "Document 1",
      authorId: user.id,
      fileUrl: "http://example.com/file.pdf",
      fileType: "pdf",
      summary: "This is a valid summary for the document.",
    });

    expect(document).to.be.an("object");
    expect(document.name).to.equal("Document 1");
    expect(document.authorId).to.equal(user.id);
    expect(document.fileUrl).to.equal("http://example.com/file.pdf");
    expect(document.fileType).to.equal("pdf");
    expect(document.summary).to.equal(
      "This is a valid summary for the document."
    );
  });

  it("02. Should retrieve all documents from a user", async () => {
    const userDocuments = await Document.findAll({
      where: { authorId: user.id },
    });

    expect(userDocuments).to.be.an("array").that.has.lengthOf(10);
  });

  it("03. Should retrieve a document by ID", async () => {
    let document = await Document.create({
      name: "Document 2",
      authorId: user.id,
      fileUrl: "http://example.com/file2.pdf",
      fileType: "pdf",
      summary: "Summary for document 2.",
    });

    const retrievedDocument = await Document.findByPk(document.id);
    expect(retrievedDocument).to.be.an("object");
    expect(retrievedDocument.id).to.equal(document.id);
    expect(retrievedDocument.name).to.equal("Document 2");
    expect(retrievedDocument.fileUrl).to.equal("http://example.com/file2.pdf");
    expect(retrievedDocument.fileType).to.equal("pdf");
    expect(retrievedDocument.summary).to.equal("Summary for document 2.");
  });

  it("04. Should update a document by ID", async () => {
    let document = await Document.create({
      name: "Document 3",
      authorId: user.id,
      fileUrl: "http://example.com/file3.pdf",
      fileType: "pdf",
      summary: "Original summary.",
    });

    document.name = "Updated Document 3";
    document.summary = "Updated summary.";
    await document.save();

    const updatedDocument = await Document.findByPk(document.id);
    expect(updatedDocument).to.be.an("object");
    expect(updatedDocument.name).to.equal("Updated Document 3");
    expect(updatedDocument.summary).to.equal("Updated summary.");
  });

  it("05. Should delete a document by ID", async () => {
    let document = await Document.create({
      name: "Document 4",
      authorId: user.id,
      fileUrl: "http://example.com/file4.pdf",
      fileType: "pdf",
      summary: "Summary to be deleted.",
    });

    await Document.destroy({ where: { id: document.id } });

    const deletedDocument = await Document.findByPk(document.id);

    expect(deletedDocument).to.not.exist;
  });

  it("06. Should not create a document with no name", async () => {
    let document;
    try {
      document = await Document.create({
        name: null,
        authorId: user.id,
        fileUrl: "http://example.com/file.pdf",
        fileType: "pdf",
        summary: "Summary with no name.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Document name is required.");
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("07. Should not create a document with too short of a name", async () => {
    let document;
    try {
      document = await Document.create({
        name: "",
        authorId: user.id,
        fileUrl: "http://example.com/file.pdf",
        fileType: "pdf",
        summary: "Summary with too short name.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Document name must be between 1 and 25 characters long."
      );
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("08. Should not create a document with too long of a name", async () => {
    let document;
    try {
      document = await Document.create({
        name: "A".repeat(26),
        authorId: user.id,
        fileUrl: "http://example.com/file.pdf",
        fileType: "pdf",
        summary: "Summary with too long name.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Document name must be between 1 and 25 characters long."
      );
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("09. Should not create a document with no authorId", async () => {
    let document;
    try {
      document = await Document.create({
        name: "Document 5",
        authorId: null,
        fileUrl: "http://example.com/file.pdf",
        fileType: "pdf",
        summary: "Summary with no author ID.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Author ID is required.");
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("10. Should not create a document with invalid authorId", async () => {
    let document;
    try {
      document = await Document.create({
        name: "Document 5",
        authorId: "one",
        fileUrl: "http://example.com/file.pdf",
        fileType: "pdf",
        summary: "Summary with no author ID.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Author ID must be an integer."
      );
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("11. Should not create a document with invalid file URL", async () => {
    let document;
    try {
      document = await Document.create({
        name: "Document 6",
        authorId: user.id,
        fileUrl: "invalid-url",
        fileType: "pdf",
        summary: "Summary with invalid file URL.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "File URL must be a valid URL."
      );
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("12. Should not create a document with no file type", async () => {
    let document;
    try {
      document = await Document.create({
        name: "Document 7",
        authorId: user.id,
        fileUrl: "http://example.com/file.pdf",
        fileType: null,
        summary: "Summary with no file type.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("File type is required.");
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("13. Should not create a document with invalid file type", async () => {
    let document;
    try {
      document = await Document.create({
        name: "Document 8",
        authorId: user.id,
        fileUrl: "http://example.com/file.pdf",
        fileType: "exe",
        summary: "Summary with invalid file type.",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("File type must be pdf.");
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("14. Should not create a document with no summary", async () => {
    let document;
    try {
      document = await Document.create({
        name: "Document 9",
        authorId: user.id,
        fileUrl: "http://example.com/file.pdf",
        fileType: "pdf",
        summary: null,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Summary is required.");
    } finally {
      expect(document).to.not.exist;
    }
  });

  it("15. Should not create a document with too long of a summary", async () => {
    let document;
    try {
      document = await Document.create({
        name: "Document 10",
        authorId: user.id,
        fileUrl: "http://example.com/file.pdf",
        fileType: "pdf",
        summary: "A".repeat(1001),
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Summary must be between 1 and 1000 characters long."
      );
    } finally {
      expect(document).to.not.exist;
    }
  });
});
