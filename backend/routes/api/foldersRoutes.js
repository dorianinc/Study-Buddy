const express = require("express");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { validateFolder } = require("../../utils/validation.js");
const { foldersController } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a folder
middleware = [...baseMiddleware, validateFolder];
router.post("/", middleware, foldersController.createFolder);

// Get all folders of specific user
router.get("/", baseMiddleware, foldersController.getAllFolders);

// Get a single folder based off id
router.get("/:folderId", baseMiddleware, foldersController.getSingleFolder);

// Update a single folder based off id
router.put("/:folderId", baseMiddleware, foldersController.updateFolder);

// Delete a single folder based off id
router.delete("/:folderId", baseMiddleware, foldersController.deleteFolder);

module.exports = router;
