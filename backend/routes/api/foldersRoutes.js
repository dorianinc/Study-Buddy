const express = require("express");
const { restoreUser, requireAuth } = require("../../utils/middleware/auth");
const { validateFolder } = require("../../utils/middleware/validation.js");
const { folder } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a folder
middleware = [...baseMiddleware, validateFolder];
router.post("/", middleware, folder.createFolder);

// Get all folders of specific user
router.get("/", baseMiddleware, folder.getAllFolders);

// Get a single folder based off id
router.get("/:folderId", baseMiddleware, folder.getSingleFolder);

// Update a single folder based off id
router.put("/:folderId", baseMiddleware, folder.updateFolder);

// Delete a single folder based off id
router.delete("/:folderId", baseMiddleware, folder.deleteFolder);

module.exports = router;
