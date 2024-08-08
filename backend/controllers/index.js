const session = require("./sessionsController")
const user = require("./usersController");
const document = require("./documentsController");
const folder = require("./foldersController")
const note = require("./notesController");
const annotation = require("./annotationsController")

module.exports = {
  session,
  user,
  folder,
  document,
  note,
  annotation
};