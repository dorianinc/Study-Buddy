const chai = require("chai");
const { sequelize, User, Folder, Document, Note } = require("../db/models");
const { userSeeds } = require("../db/seeders/20230321152755-user-seeds");
const { folderSeeds } = require("../db/seeders/20230321152756-folder-seeds");
const {
  documentSeeds,
} = require("../db/seeders/20230321152757-document-seeds");
const { noteSeeds } = require("../db/seeders/20230321152758-note-seeds");

// Disable logging for tests
sequelize.options.logging = false;

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  await User.bulkCreate(userSeeds());
  await Folder.bulkCreate(folderSeeds());
  await Document.bulkCreate(documentSeeds());
  await Note.bulkCreate(noteSeeds());

  // const users = await User.findAll();
  // const folders = await Folder.findAll();
  // const documents = await Document.findAll();
  // const notes = await Note.findAll();
  // console.log("🖥️ Users Successfully Seeded ==>", !!users.length);
  // console.log("🖥️ Folders Successfully Seeded ==>", !!folders.length);
  // console.log("🖥️ Documents Successfully Seeded ==>", !!documents.length);
  // console.log("🖥️ Notes Successfully Seeded ==>", !!notes.length);
};

module.exports = {
  seedDatabase,
};
