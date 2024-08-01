const express = require("express");
const { generateRes } = require("../../utils/genAi.js");
const { parsePDF } = require("../../utils/pdfParser.js");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { transactionHandler } = require("../../utils/transaction.js");
const { Folder, Document, Note, sequelize } = require("../../db/models");
const {
  singlePublicFileUpload,
  singleMulterUpload,
  deleteAWSObject,
} = require("../../awsS3.js");
const { validateDocument } = require("../../utils/validation.js");
const { environment } = require("../../config");
const isTesting = environment === "test";

const router = express.Router();

// Create a Document
router.post(
  "/",
  [
    singleMulterUpload("theFile"),
    restoreUser,
    requireAuth,
    validateDocument,
    transactionHandler,
  ],
  async (req, res) => {
    // parsing pdf to text and get response from gemini
    const pdfText = await parsePDF(req.file.buffer);
    const summary = await generateRes(
      "summarize this text in 14 sentences",
      pdfText
    );

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
      res.status(201).json(newDoc);
    }
  }
);

// Get all Documents for a specific user
router.get("/", [restoreUser, requireAuth], async (req, res) => {
  const { user } = req;
  const docs = await Document.findAll({
    where: { authorId: user.id },
    raw: true,
  });

  if (!docs.length) {
    res.status(404).json({ message: "No documents found for this user" });
  } else {
    res.status(200).json(docs);
  }
});

// Get a single Document based off id
router.get("/:docId", [restoreUser, requireAuth], async (req, res) => {
  const doc = await Document.findByPk(req.params.docId, { raw: true });

  // check to see if note exists before creating note
  if (!doc) res.status(404).json(doesNotExist("Document"));
  else res.status(200).json(doc);
});

// Update a single Document based off id
router.put(
  "/:docId",
  [restoreUser, requireAuth, transactionHandler],
  async (req, res) => {
    const { user } = req;
    const doc = await Note.findByPk(req.params.docId);

    if (!doc) res.status(404).json(doesNotExist("Document"));
    else {
      if (isAuthorized(user.id, doc.authorId, res)) {
        for (property in req.body) {
          let value = req.body[property];
          doc[property] = value;
        }
        await doc.save();
        res.status(200).json(doc);
      }
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
      if (!isTesting) await deleteAWSObject(fileUrl);
      await doc.destroy();
      res.status(200).json({
        message: "Successfully deleted document",
        statusCode: 200,
      });
    }
  }
});

module.exports = router;
