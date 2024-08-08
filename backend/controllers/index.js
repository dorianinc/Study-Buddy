const sessionsController = require("./sessionsController")
const usersController = require("./usersController");
const documentsController = require("./documentsController");
const foldersController = require("./foldersController")
const notesController = require("./notesController");

module.exports = {
  sessionsController,
  usersController,
  foldersController,
  docsController: documentsController,
  notesController,
};