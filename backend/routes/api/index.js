const router = require("express").Router();
const sessionRouter = require("./sessionsRoutes.js");
const usersRouter = require("./usersRoutes.js");
const folderRouter = require("./foldersRoutes.js");
const docRouter = require("./documentsRoutes.js");
const notesRouter = require("./notesRoutes.js");
const annotationRouter = require("./annotationRoutes.js");
const geminiAI = require("./geminiAi.js");
const { restoreUser } = require("../../utils/middleware/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/folders", folderRouter);
router.use("/documents", docRouter);
router.use("/notes", notesRouter);
router.use("/annotations", annotationRouter);
router.use("/gemini", geminiAI);

module.exports = router;
