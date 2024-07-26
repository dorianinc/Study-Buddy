const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const folderRouter = require("./folders.js")
const docRouter = require("./documents.js")
const notesRouter = require("./notes.js")
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/folders", folderRouter)
router.use("/documents", docRouter);
router.use("/notes", notesRouter);

module.exports = router;
