const express = require("express");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { annotationsController } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a annotation
middleware = [...baseMiddleware];
router.post("/", middleware, annotationsController.createAnnotation);

// Get all Annotations of specific document
router.get("/", baseMiddleware, annotationsController.getAnnotations);

// Get a single Annotation based off id
router.get("/:annotationId", baseMiddleware, annotationsController.getSingleAnnotation);

// Update a single Annotation based off id
router.put("/", baseMiddleware, annotationsController.updateAnnotation);

// Delete a Single Annotation based of id
router.delete("/:annotationId", baseMiddleware, annotationsController.deleteAnnotation);

module.exports = router;
