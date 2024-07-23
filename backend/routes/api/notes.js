const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const {  doesNotExist } = require("../../utils/helpers.js");

const router = express.Router();

// Create a note
router.post("/", [restoreUser, requireAuth], async (req, res) => {
  const docId = await ReviewImage.findByPk(req.query.docId);

});
module.exports = router;
