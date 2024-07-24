const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { Folder, Document } = require("../../db/models");
const {
  singlePublicFileUpload,
  singleMulterUpload,
} = require("../../awsS3.js");
const router = express.Router();

// Create a Document
router.post(
  "/",
  [singleMulterUpload("theFile"), restoreUser, requireAuth],
  async (req, res) => {
    const { user } = req;
    const { name, fileType } = req.body;

    const fileUrl = await singlePublicFileUpload(req.file);
    const folder = await Document.findByPk(req.query.folderId, { raw: true });

    if (!folder) res.status(404).json(doesNotExist("Folder"));
    else {
      const newDoc = await Document.create({
        name,
        fileType,
        fileUrl,
        authorId: user.id,
        folderId: folder.id,
      });
      return res.status(200).json(newDoc);
    }
  }
);

module.exports = router;
