const chai = require("chai");
const expect = chai.expect;
const bcrypt = require("bcryptjs");
const { sequelize, User } = require("../../db/models");
const { seedDatabase } = require("../seedDB");

// Disable logging for tests
sequelize.options.logging = false;

let user;
let password;

describe("User Model", () => {
  before(async () => {
    await sequelize.sync({ force: true });
    password = bcrypt.hashSync("password1", 10);
  });

  beforeEach(async () => {
    user = null;
    await seedDatabase();
  });

  it("01. Should create a user with valid attributes", async () => {
    user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "johndoe",
      hashedPassword: password,
    });

    expect(user).to.be.an("object");
    expect(user.firstName).to.equal("John");
    expect(user.lastName).to.equal("Doe");
    expect(user.email).to.equal("user@gmail.com");
    expect(user.username).to.equal("johndoe");
    expect(user.hashedPassword).to.equal(password);
  });

  it("02. Should retrieve a user by ID", async () => {
    user = await User.create({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@gmail.com",
      username: "janedoe",
      hashedPassword: password,
    });

    const retrievedUser = await User.findByPk(user.id);
    expect(retrievedUser).to.be.an("object");
    expect(retrievedUser.id).to.equal(user.id);
    expect(retrievedUser.firstName).to.equal("Jane");
    expect(retrievedUser.lastName).to.equal("Doe");
    expect(retrievedUser.email).to.equal("jane@gmail.com");
    expect(retrievedUser.username).to.equal("janedoe");
  });

  it("03. Should update a user by ID", async () => {
    user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "johndoe",
      hashedPassword: password,
    });

    user.firstName = "Johnny";
    user.lastName = "Doen";
    await user.save();

    const updatedUser = await User.findByPk(user.id);
    expect(updatedUser).to.be.an("object");
    expect(updatedUser.firstName).to.equal("Johnny");
    expect(updatedUser.lastName).to.equal("Doen");
  });

  it("04. Should delete a user by ID", async () => {
    user = await User.create({
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "johndoe",
      hashedPassword: password,
    });

    await User.destroy({ where: { id: user.id } });

    const deletedUser = await User.findByPk(user.id);
    expect(deletedUser).to.not.exist;
  });

  it("05. Should not create a user with no first name.", async () => {
    try {
      user = await User.create({
        firstName: null,
        lastName: "Doe",
        email: "user@gmail.com",
        username: "johndoe",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("First name is required.");
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("06. Should not create a user with too short of a first name", async () => {
    try {
      user = await User.create({
        firstName: "",
        lastName: "Doe",
        email: "user@gmail.com",
        username: "johndoe",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "First name must be between 1 and 25 characters long."
      );
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("07. Should not create a user with too long of a first name", async () => {
    try {
      user = await User.create({
        firstName: "Maximilianaquintanilladore",
        lastName: "Doe",
        email: "user@gmail.com",
        username: "johndoe",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "First name must be between 1 and 25 characters long."
      );
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("08. Should not create a user with no last name", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: null,
        email: "user@gmail.com",
        username: "johndoe",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Last name is required.");
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("09. Should not create a user with too short of a last name", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "",
        email: "user@gmail.com",
        username: "johndoe",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Last name must be between 1 and 25 characters long."
      );
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("10. Should not create a user with too long of a last name", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Maximilianaquintanilladore",
        email: "user@gmail.com",
        username: "johndoe",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Last name must be between 1 and 25 characters long."
      );
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("11. Should not create a user with no username", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "user@gmail.com",
        username: null,
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Username is required.");
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("12. Should not create a user with email as username", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "user@gmail.com",
        username: "invalid@gmail.com",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Username cannot be an email address."
      );
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("13. Should not create a user with too short of a username", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "user@gmail.com",
        username: "user",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Username must be between 5 and 15 characters long."
      );
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("14. Should not create a user with too long of a username", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "user@gmail.com",
        username: "Xx17userName17xX",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Username must be between 5 and 15 characters long."
      );
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("15. Should not create a user with no email", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: null,
        username: "johndoe",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Email is required.");
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("16. Should not create a user with invalid email", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "invalidemail.com",
        username: "johndoe",
        hashedPassword: password,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql(
        "Must be a valid email address."
      );
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("17. Should not create a user with no password", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "user@gmail.com",
        username: "johndoe",
        hashedPassword: null,
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Password is required.");
    } finally {
      expect(user).to.not.exist;
    }
  });

  it("18. Should not create a user with a non-encrypted password", async () => {
    try {
      user = await User.create({
        firstName: "John",
        lastName: "Doe",
        email: "user@gmail.com",
        username: "johndoe",
        hashedPassword: "password1",
      });
    } catch (error) {
      expect(error.errors[0].message).to.be.eql("Password must be encrypted.");
    } finally {
      expect(user).to.not.exist;
    }
  });
});
