const chai = require("chai");
const expect = chai.expect;
const { sequelize, User, Folder, Document, Note } = require("../db/models");
const { userSeeds } = require("../db/seeders/20230321152755-user-seeds");
// const { folderSeeds } = require("../db/seeders/20230321152756-folder-seeds");
// const { documentSeeds } = require("../db/seeders/20230321152757-document-seeds");
// const { noteSeeds } = require("../db/seeders/20230321152758-note-seeds");

// Disable logging for tests
sequelize.options.logging = false;

describe("Database Set-Up", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    await User.bulkCreate(userSeeds());
    // await Folder.bulkCreate(folderSeeds());
    // await Document.bulkCreate(documentSeeds());
    // await Note.bulkCreate(noteSeeds());
  });

  it("Users should be seeded", async () => {
    const users = await User.findAll({ order: [["createdAt", "DESC"]] });
    expect(users).to.be.an("array");
  });
  // it("Folders should be seeded", async () => {
  //   const folders = await Folder.findAll({ order: [["createdAt", "DESC"]] });
  //   expect(folders).to.be.an("array");
  // });
  // it("Documents should be seeded", async () => {
  //   const documents = await Document.findAll({
  //     order: [["createdAt", "DESC"]],
  //   });
  //   expect(documents).to.be.an("array");
  // });
  // it("Notes should be seeded", async () => {
  //   const notes = await Note.findAll({ order: [["createdAt", "DESC"]] });
  //   expect(notes).to.be.an("array");
  // });
});
