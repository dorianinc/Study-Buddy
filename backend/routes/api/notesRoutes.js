const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { validateNote } = require("../../utils/validation.js");
const { note } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a note
middleware = [...baseMiddleware, validateNote];
router.post("/", middleware, note.createNote);

// Get all Notes of specific document
router.get("/", baseMiddleware, note.getNotes);

// Get a single Note based off id
router.get("/:noteId", baseMiddleware, note.getSingleNote);

// Update a single Note based off id
middleware = [restoreUser, requireAuth, validateNote];
router.put("/:noteId", baseMiddleware,  note.updateNote);

// Delete a Single Note based of id
middleware = [restoreUser, requireAuth];
router.delete("/:noteId", baseMiddleware, note.deleteNote);

module.exports = router;
