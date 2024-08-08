const express = require("express");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { annotation } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a annotation
middleware = [...baseMiddleware];
router.post("/", middleware, annotation.createAnnotation);

// Get all Annotations of specific document
router.get("/", baseMiddleware, (req, res) => annotation.getAnnotations(null, req, res));

// Get a single Annotation based off id
router.get("/:annotationId", baseMiddleware, annotation.getSingleAnnotation);

// Update a single Annotation based off id
router.put("/", baseMiddleware, annotation.updateAnnotation);

// Delete a Single Annotation based of id
router.delete("/:annotationId", baseMiddleware, annotation.deleteAnnotation);

module.exports = router;
