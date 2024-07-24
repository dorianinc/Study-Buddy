const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const docRouter = require("./documents.js")
const notesRouter = require("./notes.js")
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/documents", docRouter);
router.use("/notes", notesRouter);

router.post('/test', (req, res) => {
  console.log(req.params)
  // console.log("REQ: ", req)
  console.log("FILE ",req.files)
  console.log("BODY ",req.body)
  res.json({ requestBody: req.file });

})

module.exports = router;
