const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { validateNote } = require("../../utils/validation.js");
const { notesController } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a note
middleware = [...baseMiddleware, validateNote];
router.post("/", middleware, notesController.createNote);

// Get all Notes of specific document
router.get("/", baseMiddleware, notesController.getNotes);

// Get a single Note based off id
router.get("/:noteId", baseMiddleware, notesController.getSingleNote);

// Update a single Note based off id
middleware = [restoreUser, requireAuth, validateNote];
router.put("/:noteId", baseMiddleware,  notesController.updateNote);

// Delete a Single Note based of id
middleware = [restoreUser, requireAuth];
router.delete("/:noteId", baseMiddleware, notesController.deleteNote);

module.exports = router;
