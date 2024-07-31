const chai = require("chai");
const expect = chai.expect;
const bcrypt = require("bcryptjs");
const { sequelize, Folder, User } = require("../../db/models");
const { seedDatabase } = require("../seedDB");

// Disable logging for tests
sequelize.options.logging = false;

let user;
let folder;

describe("Folder Model", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "johndoe",
      hashedPassword: bcrypt.hashSync("password1", 10),
    });
  });

  beforeEach(async () => {
    folder = null;
    await seedDatabase();
  });

  it("01. Should create a folder with valid attributes", async () => {
    folder = await Folder.create({
      name: "Folder 1",
      userId: user.id,
      category: "Math",
    });

    expect(folder).to.be.an("object");
    expect(folder.name).to.equal("Folder 1");
    expect(folder.userId).to.equal(user.id);
    expect(folder.category).to.equal("Math");
  });

  it("02. Should retrieve all folders for a user", async () => {
    await Folder.create({
      name: "Folder 1",
      userId: user.id,
      category: "Math",
    });

    await Folder.create({
      name: "Folder 2",
      userId: user.id,
      category: "Science",
    });

    const userFolders = await Folder.findAll({ where: { userId: user.id } });

    expect(userFolders).to.be.an("array").that.has.lengthOf(2);

    const folderNames = userFolders.map((folder) => folder.name);
    expect(folderNames).to.include.members(["Folder 1", "Folder 2"]);
  });

  it("03. Should retrieve a folder by ID", async () => {
    folder = await Folder.create({
      name: "Folder 3",
      userId: user.id,
      category: "History",
    });

    const retrievedFolder = await Folder.findByPk(folder.id);
    expect(retrievedFolder).to.be.an("object");
    expect(retrievedFolder.id).to.equal(folder.id);
    expect(retrievedFolder.name).to.equal("Folder 3");
    expect(retrievedFolder.category).to.equal("History");
  });

  it("04. Should update a folder by ID", async () => {
    const originalData = {
      name: "Folder 4",
      userId: user.id,
      category: "Literature",
    };
    const updatedData = {
      name: "Folder 5",
      category: "Math",
    };
    folder = await Folder.create(originalData);

    folder.name = updatedData.name;
    folder.category = updatedData.category;
    await folder.save();

    const updatedFolder = await Folder.findByPk(folder.id);

    expect(updatedFolder).to.be.an("object");
    expect(updatedFolder.name).to.not.equal(originalData.name);
    expect(updatedFolder.category).to.not.equal(originalData.category);
    expect(updatedFolder.name).to.equal(updatedData.name);
    expect(updatedFolder.category).to.equal(updatedData.category);
  });

  it("05. Should delete a folder by ID", async () => {
    folder = await Folder.create({
      name: "Folder 5",
      userId: user.id,
      category: "General",
    });

    await Folder.destroy({ where: { id: folder.id } });

    const deletedFolder = await Folder.findByPk(folder.id);
    expect(deletedFolder).to.not.exist;
  });

  it("06. Should not create a folder with no name", async () => {
    try {
      folder = await Folder.create({
        name: null,
        userId: user.id,
        category: "General",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Folder name is required.");
    } finally {
      expect(folder).to.not.exist;
    }
  });

  it("07. Should not create a folder with too short of a name", async () => {
    try {
      folder = await Folder.create({
        name: "",
        userId: user.id,
        category: "General",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Folder name must be between 1 and 25 characters long."
      );
    } finally {
      expect(folder).to.not.exist;
    }
  });

  it("08. Should not create a folder with too long of a name", async () => {
    try {
      folder = await Folder.create({
        name: "A".repeat(26),
        userId: user.id,
        category: "General",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Folder name must be between 1 and 25 characters long."
      );
    } finally {
      expect(folder).to.not.exist;
    }
  });

  it("09. Should not create a folder without a userId", async () => {
    try {
      folder = await Folder.create({
        name: "Folder 6",
        userId: null,
        category: "General",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("User ID is required.");
    } finally {
      expect(folder).to.not.exist;
    }
  });

  it("10. Should not create a folder with an invalid userId", async () => {
    try {
      folder = await Folder.create({
        name: "Folder 7",
        userId: "one",
        category: "General",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("User ID must be an integer.");
    } finally {
      expect(folder).to.not.exist;
    }
  });

  it("11. Should not create a folder with an invalid category", async () => {
    try {
      folder = await Folder.create({
        name: "Folder 8",
        userId: user.id,
        category: "InvalidCategory",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Category must be one of: General, Math, Science, History, Literature."
      );
    } finally {
      expect(folder).to.not.exist;
    }
  });

  it("12. Should not create a folder with no category", async () => {
    try {
      folder = await Folder.create({
        name: "Folder 9",
        userId: user.id,
        category: null,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Category is required.");
    } finally {
      expect(folder).to.not.exist;
    }
  });
});
