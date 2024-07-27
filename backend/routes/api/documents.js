const { generateRes } = require("../../utils/genAi.js");
const { parsePDF } = require("../../utils/pdfParser.js");

const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { Folder, Document, Note } = require("../../db/models");
const {
  singlePublicFileUpload,
  singleMulterUpload,
  deleteAWSObject,
} = require("../../awsS3.js");
const router = express.Router();

// Create a Document
router.post(
  "/",
  [singleMulterUpload("theFile"), restoreUser, requireAuth],
  async (req, res) => {
    // parsing pdf to text and get response from gemini
    const pdfText = await parsePDF(req.file.buffer);
    const summary = await generateRes("summarize this text in 14 sentences", pdfText);

    const { user } = req;
    const { name, fileType } = req.body;

    const fileUrl = await singlePublicFileUpload(req.file);
    const folder = await Folder.findByPk(req.query.folderId, { raw: true });

    if (!folder) res.status(404).json(doesNotExist("Folder"));
    else {
      const newDoc = await Document.create({
        name,
        fileType,
        fileUrl,
        summary,
        authorId: user.id,
        folderId: folder.id,
      });
      res.status(200).json(newDoc);
    }
  }
);

// Delete a Document
router.delete("/:docId", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const doc = await Document.findByPk(req.params.docId);
  if (!doc) res.status(404).json(doesNotExist("Document"));
  else {
    const fileUrl = doc.fileUrl;
    if (isAuthorized(user.id, doc.authorId, res)) {
      await deleteAWSObject(fileUrl);
      await doc.destroy();
      res.status(200).json({
        message: "Successfully deleted document",
        statusCode: 200,
      });
    }
  }
});

module.exports = router;
