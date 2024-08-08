const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { Document, Annotation } = require("../../db/models");
const { validateNote } = require("../../utils/validation.js");
const { transactionHandler } = require("../../utils/transaction.js");

const router = express.Router();
let middleware = [];

// Create a annotation
middleware = [restoreUser, requireAuth, validateNote, transactionHandler];
router.post("/", middleware, async (req, res) => {
  const { user } = req;
  const { content } = req.body;
  const doc = await Document.findByPk(req.query.docId, { raw: true });

  // check to see if document exists before creating annotation
  if (!doc) res.status(404).json(doesNotExist("Document"));
  else {
    if (isAuthorized(user.id, doc.authorId, res)) {
      const newNote = await Annotation.create({
        content,
        docId: doc.id,
        authorId: user.id,
      });
      res.status(200).json(newNote);
    } else {
      res.status(403).json({
        message: "Forbidden",
        statusCode: 403,
      });
    }
  }
});

// Get all Annotations of specific document
middleware = [restoreUser, requireAuth];
router.get("/", middleware, async (req, res) => {
  /*

  allHilights = {
  singleDocumentHighlights: [
  id: string
  comment: "this can be anythign"
  content: {
    type: "text"
    text: "random text highlighted from pdf"
  }
  or
  content: {
    type: "area"
    image: "data:image/png....."
  }
    
  ] 
  }
  */
});

// Update a single Annotation based off id
middleware = [restoreUser, requireAuth, validateNote, transactionHandler];
router.put("/:noteId", middleware, async (req, res) => {
  const { user } = req;
  const annotation = await Annotation.findByPk(req.params.noteId);

  if (!annotation) res.status(404).json(doesNotExist("Annotation"));
  else {
    if (isAuthorized(user.id, annotation.authorId, res)) {
      for (property in req.body) {
        let value = req.body[property];
        annotation[property] = value;
      }
      await annotation.save();
      res.status(200).json(annotation);
    }
  }
});

// Delete a Single Annotation based of id
middleware = [restoreUser, requireAuth, transactionHandler];
router.delete("/:noteId", middleware, async (req, res) => {
  const { user } = req;
  const annotation = await Annotation.findByPk(req.params.noteId);

  if (!annotation) res.status(404).json(doesNotExist("Annotation"));
  else {
    if (isAuthorized(user.id, annotation.authorId, res)) {
      await annotation.destroy();
      res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
        noteId: annotation.id 
      });
    }
  }
});

module.exports = router;
