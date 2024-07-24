const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);

router.post('/test', (req, res) => {
  console.log("FILE ",req.files)
  console.log("BODY ",req.body)
  // res.json({ requestBody: req.body });

})

module.exports = router;
