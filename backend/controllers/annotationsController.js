const { isAuthorized } = require("../utils/auth");
const { doesNotExist } = require("../utils/helpers.js");
const {
  Annotation,
  Content,
  HighlightBox,
  Highlight,
} = require("../db/models");

// Create a annotation
const createAnnotation = async () => {
  // const { user } = req;
  // const { content } = req.body;
  // const doc = await Document.findByPk(req.query.docId, { raw: true });
  // const project = await HighlightBox.findOne({
  //   where: { annotationId: "My Title" },
  // });
  // // check to see if document exists before creating annotation
  // if (!doc) res.status(404).json(doesNotExist("Document"));
  // else {
  //   if (isAuthorized(user.id, doc.authorId, res)) {
  //     const newNote = await Annotation.create({
  //       content,
  //       docId: doc.id,
  //       authorId: user.id,
  //     });
  //     res.status(200).json(newNote);
  //   } else {
  //     res.status(403).json({
  //       message: "Forbidden",
  //       statusCode: 403,
  //     });
  //   }
  // }
};

// add docUrl to annotation
// create option where you can get annotions through query or direct parameter

// Get all Annotations of specific document
const getAnnotations = async (req, res, docId = null) => {
  let user;
  if (req) {
    user = { req };
    docId = req.query.docId;
  }

  const annotations = await Annotation.findAll({
    where: { docId },
    raw: true,
  });
  const docUrl = annotations[0].docUrl;

  for (let i = 0; i < annotations.length; i++) {
    const annotation = annotations[i];
    annotation.position = {};
    const content = await Content.findOne({
      where: { annotationId: annotation.id },
      raw: true,
    });
    const highlightBox = await HighlightBox.findOne({
      where: { annotationId: annotation.id },
      raw: true,
    });

    const highlights = await Highlight.findAll({
      where: { annotationId: annotation.id },
      raw: true,
    });

    annotation.content = content;
    annotation.position.boundingRect = highlightBox;
    annotation.position.rects = highlights;
  }

  if (req) {
    res.status(200).json({ [docUrl]: [...annotations] });
  } else {
    return { [docUrl]: [...annotations] };
  }
};

// Update a single Annotation based off id
const getSingleAnnotation = async () => {
  const annotation = await Annotation.findByPk(req.params.docId, { raw: true });

  // check to see if note exists before creating note
  if (!annotation) res.status(404).json(doesNotExist("Annotation"));
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
  deleteAnnotation,
};
