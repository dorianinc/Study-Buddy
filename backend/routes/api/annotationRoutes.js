const express = require("express");
const { restoreUser, requireAuth } = require("../../utils/auth");
const { annotation } = require("../../controllers");

const router = express.Router();
const baseMiddleware = [restoreUser, requireAuth];
let middleware = [];

// Create a annotation
middleware = [...baseMiddleware];
router.post("/", middleware,(req,res)=>annotation.createAnnotation(req,res));

// Get all Annotations of specific document
router.get("/", baseMiddleware, (req, res) => annotation.getAnnotations(req, res));

// Get a single Annotation based off id
router.get("/:annotationId", baseMiddleware, annotation.getSingleAnnotation);

// Update a single Annotation based off id
router.put("/:annotationId", baseMiddleware, (req,res)=>annotation.updateAnnotation(req,res));

// Delete a Single Annotation based of id
router.delete("/:annotationId", baseMiddleware, annotation.deleteAnnotation);

module.exports = router;
