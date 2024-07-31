const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { Document, Note } = require("../../db/models");
const { validateNote } = require("../../utils/validation.js");
const { transactionHandler } = require("../../utils/transaction.js");

const router = express.Router();

// Create a note
router.post(
  "/",
  [restoreUser, requireAuth, validateNote, transactionHandler],
  async (req, res) => {
    const { user } = req;
    const { content } = req.body;
    const doc = await Document.findByPk(req.query.docId, { raw: true });

    // check to see if document exists before creating note
    if (!doc) res.status(404).json(doesNotExist("Document"));
    else {
      if (isAuthorized(user.id, doc.authorId, res)) {
        const newNote = await Note.create({
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
  }
);

// Get all Notes of specific document
router.get("/", async (req, res) => {
  const notes = await Note.findAll({
    where: {
      docId: req.query.docId,
    },
    order: [["createdAt", "DESC"]],
  });

  if (!notes.length) res.status(404).json(doesNotExist("Document"));
  else res.status(200).json(notes);
});

// Get a single Note based off id
router.get("/:noteId", [restoreUser, requireAuth], async (req, res) => {
  const note = await Note.findByPk(req.params.noteId, { raw: true });

  // check to see if note exists before creating note
  if (!note) res.status(404).json(doesNotExist("Note"));
  else res.status(200).json(note);
});

// Update a single Note based off id
router.put(
  "/:noteId",
  [restoreUser, requireAuth, validateNote, transactionHandler],
  async (req, res) => {
    const { user } = req;
    const note = await Note.findByPk(req.params.noteId);

    if (!note) res.status(404).json(doesNotExist("Note"));
    else {
      if (isAuthorized(user.id, note.authorId, res)) {
        for (property in req.body) {
          let value = req.body[property];
          note[property] = value;
        }
        await note.save();
        res.status(200).json(note);
      }
    }
  }
);

// Delete a Single Note based of id
router.delete(
  "/:noteId",
  [restoreUser, requireAuth, transactionHandler],
  async (req, res) => {
    const { user } = req;
    const note = await Note.findByPk(req.params.noteId);

    if (!note) res.status(404).json(doesNotExist("Note"));
    else {
      if (isAuthorized(user.id, note.authorId, res)) {
        await note.destroy();
        res.status(200).json({
          message: "Successfully deleted",
          statusCode: 200,
        });
      }
    }
  }
);

module.exports = router;
