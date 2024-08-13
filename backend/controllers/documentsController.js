const { generateRes } = require("../utils/genAi.js");
const { parsePDF } = require("../utils/pdfParser.js");
const { isAuthorized } = require("../utils/middleware/auth");
const { doesNotExist } = require("../utils/middleware/helpers.js");
const { Folder, Document, Note } = require("../db/models");
const { uploadAWSFile, deleteAWSFile } = require("../awsS3.js");
const { environment } = require("../config");
const { getAnnotations } = require("./annotationsController.js");
const saveToFile = require("../utils/saveToFile.js");
const isTesting = environment === "test";

// Create a Document
const createDocument = async (req, res) => {
  // parsing pdf to text and get response from gemini
  const pdfText = await parsePDF(req.file.buffer);
  const summary = await generateRes(
    "Summarize this text in 14 sentences or less",
    pdfText
  );

  const { user } = req;
  const { name, fileType } = req.body;
  const fileUrl = await uploadAWSFile(req.file);
  const folder = await Folder.findByPk(req.query.folderId, { raw: true });

  if (!folder) res.status(404).json(doesNotExist("Folder"));
  else {
    const newDoc = await Document.create({
      name,
      fileType,
      fileUrl,
      summary,
      authorId: user.id,
      folderId: folder.id,
    });
    // leave line below commented out unless your trying to store this a seed data in a json file
    saveToFile("document", newDoc.toJSON())
    res.status(201).json(newDoc);
  }
};

// Get all Documents for a specific user
const getDocuments = async (req, res) => {
  const { user } = req;
  const docs = await Document.findAll({
    where: { authorId: user.id },
    raw: true,
  });

  if (!docs.length) {
    res.status(404).json({ message: "No documents found for this user" });
  } else {
    res.status(200).json(docs);
  }
};

// Get a single Document based off id
const getSingleDocument = async (req, res) => {
  const doc = await Document.findByPk(req.params.docId, { raw: true });
  const annotations = await getAnnotations(null, null, doc.id);
  doc.annotations = annotations;
  // check to see if note exists before creating note
  if (!doc) res.status(404).json(doesNotExist("Document"));
  else res.status(200).json(doc);
};

// Update a single Document based off id
const updateDocument = async (req, res) => {
  const { user } = req;
  const doc = await Note.findByPk(req.params.docId);

  if (!doc) res.status(404).json(doesNotExist("Document"));
  else {
    if (isAuthorized(user.id, doc.authorId, res)) {
      for (property in req.body) {
        let value = req.body[property];
        doc[property] = value;
      }
      await doc.save();
      res.status(200).json(doc);
    }
  }
};

// Delete a Document
const deleteDocument = async (req, res) => {
  const { user } = req;
  const doc = await Document.findByPk(req.params.docId);

  if (!doc) res.status(404).json(doesNotExist("Document"));
  else {
    const fileUrl = doc.fileUrl;
    if (isAuthorized(user.id, doc.authorId, res)) {
      if (!isTesting) await deleteAWSFile(fileUrl);
      await doc.destroy();
      res.status(200).json({
        message: "Successfully deleted document",
        statusCode: 200,
      });
    }
  }
};

module.exports = {
  createDocument,
  getDocuments,
  getSingleDocument,
  updateDocument,
  deleteDocument,
};
