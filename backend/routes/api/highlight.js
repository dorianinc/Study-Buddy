const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { Document, Highlight } = require("../../db/models");
const { validateNote } = require("../../utils/validation.js");
const { transactionHandler } = require("../../utils/transaction.js");

const router = express.Router();
let middleware = [];

// Create a highlight
middleware = [restoreUser, requireAuth, validateNote, transactionHandler];
router.post("/", middleware, async (req, res) => {
  const { user } = req;
  const { content } = req.body;
  const doc = await Document.findByPk(req.query.docId, { raw: true });

  // check to see if document exists before creating highlight
  if (!doc) res.status(404).json(doesNotExist("Document"));
  else {
    if (isAuthorized(user.id, doc.authorId, res)) {
      const newNote = await Highlight.create({
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

// Get all Highlights of specific document
middleware = [restoreUser, requireAuth];
router.get("/", middleware, async (req, res) => {
  /*

  allHilights = {
  singleDocumentHighlights: [
  id: string
  comment: "this can be anythign"
  content: {
    type: "text"
    text: "reandom ttext highlighted from pdf"
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

// Update a single Highlight based off id
middleware = [restoreUser, requireAuth, validateNote, transactionHandler];
router.put("/:noteId", middleware, async (req, res) => {
  const { user } = req;
  const highlight = await Highlight.findByPk(req.params.noteId);

  if (!highlight) res.status(404).json(doesNotExist("Highlight"));
  else {
    if (isAuthorized(user.id, highlight.authorId, res)) {
      for (property in req.body) {
        let value = req.body[property];
        highlight[property] = value;
      }
      await highlight.save();
      res.status(200).json(highlight);
    }
  }
});

// Delete a Single Highlight based of id
middleware = [restoreUser, requireAuth, transactionHandler];
router.delete("/:noteId", middleware, async (req, res) => {
  const { user } = req;
  const highlight = await Highlight.findByPk(req.params.noteId);

  if (!highlight) res.status(404).json(doesNotExist("Highlight"));
  else {
    if (isAuthorized(user.id, highlight.authorId, res)) {
      await highlight.destroy();
      res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
        noteId: highlight.id // added noteId to update redux store with highlight id
      });
    }
  }
});

module.exports = router;
