const { isAuthorized } = require("../utils/middleware/auth");
const { doesNotExist } = require("../utils/middleware/helpers.js");
const { Folder, Document } = require("../db/models");
const saveToFile = require("../utils/saveToFile.js");


// Create a folder
const createFolder = async (req, res) => {
  const { user } = req;
  const data = { userId: user.id };

  for (property in req.body) {
    let value = req.body[property];
    data[property] = value;
  }

  const newFolder = await Folder.create({ ...data });

  res.status(201).json(newFolder);
};

// Get all folders of specific user
const getAllFolders = async (req, res) => {
  const { user } = req;
  const folders = await Folder.findAll({
    where: {
      userId: user.id,
    },
    order: [["createdAt", "DESC"]],
  });

  if (!folders) res.status(404).json(doesNotExist("Folders"));
  else res.status(200).json(folders);
};

// Get a single folder based of id
const getSingleFolder = async (req, res) => {
  const folder = await Folder.findByPk(req.params.folderId, { raw: true });
  const documents = await Document.findAll({
    where: {
      folderId: req.params.folderId,
    },
  });
  if (!folder) res.status(404).json(doesNotExist("Folder"));
  else {
    folder.documents = documents;
    res.status(200).json(folder);
  }
};

// Update a single folder based of id
const updateFolder = async (req, res) => {
  const { user } = req;
  const folder = await Folder.findByPk(req.params.folderId);

  if (!folder) res.status(404).json(doesNotExist("Folder"));
  else {
    if (isAuthorized(user.id, folder.userId, res)) {
      for (property in req.body) {
        let value = req.body[property];
        folder[property] = value;
      }
      await folder.save();
      res.status(200).json(folder);
    }
  }
};

// Delete a single folder based off id
const deleteFolder = async (req, res) => {
  const { user } = req;
  const folder = await Folder.findByPk(req.params.folderId);

  if (!folder) res.status(404).json(doesNotExist("Folder"));
  else {
    if (isAuthorized(user.id, folder.userId, res)) {
      await folder.destroy();
      res.status(200).json({
        message: "Folder was successfully deleted",
        statusCode: 200,
      });
    }
  }
};

module.exports = {
  createFolder,
  getAllFolders,
  getSingleFolder,
  updateFolder,
  deleteFolder,
};
