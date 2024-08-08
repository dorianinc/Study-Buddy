const express = require("express");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { validateDocument } = require("../../utils/validation.js");
const { handleMulter } = require("../../awsS3.js");
const { document } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a Document
middleware = [...baseMiddleware, validateDocument];
router.post("/", [handleMulter("theFile"), ...middleware], document.createDocument);

// Get all Documents for a specific user
router.get("/", baseMiddleware, document.getDocuments);

// Get a single Document based off id
router.get("/:docId", baseMiddleware, document.getSingleDocument);

// Update a single Document based off id
router.put("/:docId", baseMiddleware, document.updateDocument);

// Delete a Document
router.delete("/:docId", baseMiddleware, document.deleteDocument);

module.exports = router;
