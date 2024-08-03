const express = require("express");
const { restoreUser, requireAuth, isAuthorized } = require("../../utils/auth");
const { doesNotExist } = require("../../utils/helpers.js");
const { validateFolder } = require("../../utils/validation.js");
const { Folder, Document } = require("../../db/models");
const { transactionHandler } = require("../../utils/transaction.js");

const router = express.Router();

// const router = express.Router();

// Create a folder
router.post(
  "/",
  [restoreUser, requireAuth, validateFolder, transactionHandler],
  async (req, res) => {
    const { user } = req;
    const data = { userId: user.id };

    for (property in req.body) {
      let value = req.body[property];
      data[property] = value;
    }

    const folder = await Folder.create({ ...data });
    res.status(201).json(folder);
  }
);

// Get all folders of specific user
router.get(
  "/",
  [restoreUser, requireAuth, transactionHandler],
  async (req, res) => {
    const { user } = req;
    console.log(user," USER HERE BACKEND")
    const folders = await Folder.findAll({
      where: {
        userId: user.id,
      },
      order: [["createdAt", "DESC"]],
    });
    if (!folders.length) res.status(404).json(doesNotExist("Folders"));
    else res.status(200).json(folders);
  }
);

// Get a single folder based off id
router.get("/:folderId", [restoreUser, requireAuth], async (req, res) => {
  const folder = await Folder.findByPk(req.params.folderId, { raw: true });
  const documents = await Document.findAll({
    where: {
      folderId: req.params.folderId
    }
  })
  if (!folder) res.status(404).json(doesNotExist("Folder"));
  else {
    folder.documents = documents;
    res.status(200).json(folder);
  }
});

// Update a single folder based off id
router.put(
  "/:folderId",
  [restoreUser, requireAuth, transactionHandler],
  async (req, res) => {
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
  }
);

// Delete a Single Note based off id
router.delete(
  "/:folderId",
  [restoreUser, requireAuth, transactionHandler],
  async (req, res) => {
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
  }
);

module.exports = router;
