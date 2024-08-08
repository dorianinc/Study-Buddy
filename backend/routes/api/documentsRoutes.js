const express = require("express");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { validateDocument } = require("../../utils/validation.js");
const { handleMulter } = require("../../awsS3.js");
const { docsController } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a Document
middleware = [...baseMiddleware, validateDocument];
router.post("/", [handleMulter("theFile"), ...middleware], docsController.createDocument);

// Get all Documents for a specific user
router.get("/", baseMiddleware, docsController.getDocuments);

// Get a single Document based off id
router.get("/:docId", baseMiddleware, docsController.getSingleDocument);

// Update a single Document based off id
router.put("/:docId", baseMiddleware, docsController.updateDocument);

// Delete a Document
router.delete("/:docId", baseMiddleware, docsController.deleteDocument);

module.exports = router;
