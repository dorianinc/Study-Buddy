const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { Document } = require("../../db/models");

const router = express.Router();

// Create a note
router.post("/", [restoreUser, requireAuth], async (req, res) => {
  console.log("creating notes")
  const doc = await Document.findByPk(req.query.docId);
  const docId = doc.id;
  console.log("🖥️   docId: ",  docId)
});
module.exports = router;
