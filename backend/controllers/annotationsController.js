const crypto = require("crypto");
const { isAuthorized } = require("../utils/auth");
const { doesNotExist } = require("../utils/helpers.js");
const {
  Annotation,
  Content,
  HighlightBox,
  Highlight,
} = require("../db/models");

// Create an annotation
const createAnnotation = async (req, res) => {
  try {
    const { user } = req;
    const id = crypto.randomUUID();
    const { docId, docUrl, type, comment, content, position } = req.body;
    const highlightBox = position.boundingRect;
    const highlights = position.rects;
    console.log('from server',{...req.body})

    // Log inputs
    // console.log("🖥️  id: ", id);
    // console.log("Type: ", type);
    // console.log("Comment: ", comment);
    // console.log("Content: ", content);
    // console.log("HighlightBox: ", highlightBox);
    // console.log("Highlights: ", highlights);

    // Create the annotation
    const annotation = await Annotation.create({
      id,
      authorId: user.id,
      docId,
      docUrl,
      type,
      comment,
    });

    // Set content
    let contentMain
    if (content.text) {
      contentMain = await Content.create({
        annotationId: id,
        text: content.text,
      });
    } else {
      contentMain = await Content.create({
        annotationId: id,
        image: content.image,
      });
    }
    annotation.content = contentMain

    //set boundingRects
    const boundingRect = await HighlightBox.create({
      annotationId: id,
      x1: Number(highlightBox.x1),
      y1: highlightBox.y1,
      x2: highlightBox.x2,
      y2: highlightBox.y2,
      width: highlightBox.width,
      height: highlightBox.height,
      pageNumber: highlightBox.pageNumber,
    });
    annotation.position = {}
    annotation.position.boundingRect = boundingRect

    // Set highlights
    annotation.rects = []
    for (let i = 0; i < highlights.length; i++) {
      const highlight = highlights[i];
      const rect = await Highlight.create({
        annotationId: id,
        x1: highlight.x1,
        y1: highlight.y1,
        x2: highlight.x2,
        y2: highlight.y2,
        width: highlight.width,
        height: highlight.height,
        pageNumber: highlight.pageNumber,
      });
      annotation.rects.push(rect)

    }

    res.json(annotation);

  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "An error occurred" });
  }
};

// add docUrl to annotation
// create option where you can get annotions through query or direct parameter

// Get all Annotations of specific document
const getAnnotations = async (req, res, docId = null) => {
  let user;
  if (req) {
    user = req.user;
    docId = req.query.docId;
  }
  const annotations = await Annotation.findAll({
    where: { docId },
    raw: true,
    order:[
      ['createdAt','DESC']
    ]
  });

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
    res.status(200).json(annotations);
  } else {
    return annotations;
  }
};

// Update a single Annotation based off id
const getSingleAnnotation = async (req, res) => {};

// Update a single Annotation based off id
const updateAnnotation = async (req, res) => {
  const user = req.user
  const {annotationId} = req.params
  const {commentText} = req.body
  const annotation = await Annotation.findByPk(annotationId)
  if(!annotation){
    res.status(404).json(doesNotExist("Annotation"))
  }
  if(isAuthorized(user.id,annotation.authorId,res)){

    annotation.comment = commentText
    await annotation.save()
    res.json(annotation)
  }else{
    res.json({"message":"Unauthorized"})
  }
};

// Delete a Single Annotation based of id
const deleteAnnotation = async (req, res) => {
  const user = req.user
  const {annotationId} = req.params
  const annotation  = await Annotation.findByPk(annotationId)
  if(!annotation){
    res.status(404).json(doesNotExist("Annotation"))
  }
  if(isAuthorized(user.id,annotation.authorId,res)){
    await annotation.destroy()
    res.json({"annotationId":annotationId})
  }
  res.json({"message":"Unauthorized"})
};

module.exports = {
  createAnnotation,
  getAnnotations,
  getSingleAnnotation,
  updateAnnotation,
  deleteAnnotation,
};
