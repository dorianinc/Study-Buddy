const { isAuthorized } = require("../utils/auth");
const { doesNotExist } = require("../utils/helpers.js");
const { Document, Annotation } = require("../db/models");

// Create a annotation
const createAnnotation = async () => {
  const { user } = req;
  const { content } = req.body;
  const doc = await Document.findByPk(req.query.docId, { raw: true });

  // check to see if document exists before creating annotation
  if (!doc) res.status(404).json(doesNotExist("Document"));
  else {
    if (isAuthorized(user.id, doc.authorId, res)) {
      const newNote = await Annotation.create({
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
};

// Get all Annotations of specific document
const getAnnotations = async (req, res) => {
  const { user } = req;
  const annotations = await Annotation.findAll({
    where: {docId: req.query.docId}, raw: true})

    annotations.array.forEach(annotations => {
      
    });
  console.log("🖥️  annotations: ", annotations)
  res.status(200).json(annotations)
}

// Update a single Annotation based off id
const getSingleAnnotation = async () => {
  const annotation = await Annotation.findByPk(req.params.docId, { raw: true });

  // check to see if note exists before creating note
  if (!annotation) res.status(404).json(doesNotExist("Document"));
  else res.status(200).json(annotation);
};

// Update a single Annotation based off id
const updateAnnotation = async () => {
  const { user } = req;
  const annotation = await Annotation.findByPk(req.params.noteId);

  if (!annotation) res.status(404).json(doesNotExist("Annotation"));
  else {
    if (isAuthorized(user.id, annotation.authorId, res)) {
      for (property in req.body) {
        let value = req.body[property];
        annotation[property] = value;
      }
      await annotation.save();
      res.status(200).json(annotation);
    }
  }
};

// Delete a Single Annotation based of id
const deleteAnnotation = async () => {
  const { user } = req;
  const annotation = await Annotation.findByPk(req.params.noteId);

  if (!annotation) res.status(404).json(doesNotExist("Annotation"));
  else {
    if (isAuthorized(user.id, annotation.authorId, res)) {
      await annotation.destroy();
      res.status(200).json({
        message: "Successfully deleted",
        statusCode: 200,
        noteId: annotation.id,
      });
    }
  }
};

module.exports = {
  createAnnotation,
  getAnnotations,
  getSingleAnnotation,
  updateAnnotation,
  deleteAnnotation
}
