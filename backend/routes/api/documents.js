
const express = require("express");
const { generateRes } = require("../../utils/genAi.js");
const { parsePDF } = require("../../utils/pdfParser.js");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { transactionHandler } = require("../../utils/transaction.js");
const { validateDocument } = require("../../utils/validation.js");
const { Folder, Document, Note,Highlight } = require("../../db/models");
const { handleMulterFile, uploadAWSFile, deleteAWSFile } = require("../../awsS3.js");
const { environment } = require("../../config");
const isTesting = environment === "test";

const router = express.Router();
let middleware = [];

// Create a Document
middleware = [restoreUser, requireAuth, validateDocument, transactionHandler];
router.post("/", [handleMulterFile("theFile"), ...middleware], async (req, res) => {
  // parsing pdf to text and get response from gemini
  const pdfText = await parsePDF(req.file.buffer);
    if (pdfText instanceof Error) res.status(400).json({"message":"Bad Request"})
  const summary = generateRes(
    "summarize this text in 14 sentences",
    pdfText
  );

  const { user } = req;
  const { name, fileType } = req.body;
  const fileUrl = await uploadAWSFile(req.file);
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
});

// Get all Documents for a specific user
middleware = [restoreUser, requireAuth];
router.get("/", middleware, async (req, res) => {
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
middleware = [restoreUser, requireAuth];
router.get("/:docId", middleware, async (req, res) => {
  console.log('this is docid',req.params.docId)
  const doc = await Document.findByPk(req.params.docId,{
    include:{model:Highlight}
  });

  // check to see if note exists before creating notes
  if (!doc) res.status(404).json(doesNotExist("Document"));
  else res.status(200).json(doc);
});

// Update a single Document based off id
middleware = [restoreUser, requireAuth, transactionHandler];
router.put("/:docId", middleware, async (req, res) => {
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

});

// Delete a Document
middleware = [restoreUser, requireAuth]
router.delete("/:docId", middleware, async (req, res) => {
  const { user } = req;
  const doc = await Document.findByPk(req.params.docId);

  if (!doc) res.status(404).json(doesNotExist("Document"));
  else {
    const fileUrl = doc.fileUrl;
    if (isAuthorized(user.id, doc.authorId, res)) {
      if (!isTesting) await deleteAWSFile(fileUrl);
      await doc.destroy();
      res.status(200).json({
        message: "Successfully deleted document",
        statusCode: 200,
      });
    }
  }

});

module.exports = router;
