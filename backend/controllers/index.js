const sessionsController = require("./sessionsController")
const usersController = require("./usersController");
const documentsController = require("./documentsController");
const foldersController = require("./foldersController")
const notesController = require("./notesController");
const annotationsController = require("./annotationsController")

module.exports = {
  sessionsController,
  usersController,
  foldersController,
  docsController: documentsController,
  notesController,
  annotationsController
};