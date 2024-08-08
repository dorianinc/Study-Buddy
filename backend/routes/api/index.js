const router = require("express").Router();
const sessionRouter = require("./sessionsRoutes.js");
const usersRouter = require("./usersRoutes.js");
const folderRouter = require("./foldersRoutes.js");
const docRouter = require("./documentsRoutes.js");
const notesRouter = require("./notesRoutes.js");
const annotationRouter = require("./annotation.js");
const geminiAI = require("./geminiAi.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/folders", folderRouter);
router.use("/documents", docRouter);
router.use("/notes", notesRouter);
router.use("/annotation", annotationRouter);
router.use("/gemini", geminiAI);

module.exports = router;
