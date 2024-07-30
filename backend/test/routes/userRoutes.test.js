const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const app = require("../../app");

const agent = request.agent(app);
let xsrfToken;

describe("User Routes", () => {
  it("Should get CSRF token", async () => {
    const response = await agent.get("/api/csrf/restore");
    xsrfToken = response.body["XSRF-TOKEN"];

    expect(response.status).to.equal(201);
  });

  it("Should login an existing user", async () => {
    const data = {
      credential: "demo_user123",
      password: "password1",
    };

    const response = await agent
      .post("/api/session")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user } = response.body;

    expect(user).to.be.an("object");

    if (data.credential.includes("@")) {
      expect(user.email).to.equal(data.credential);
    } else {
      expect(user.username).to.equal(data.credential);
    }

    expect(response.status).to.equal(200);
  });

  it("Should sign up a new user", async () => {
    const data = {
      firstName: "doug",
      lastName: "Dimmidome",
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user } = response.body;

    expect(user).to.be.an("object");
    expect(user.firstName).to.equal(data.firstName);
    expect(user.lastName).to.equal(data.lastName);
    expect(user.email).to.equal(data.email);
    expect(user.username).to.equal(data.username);
    expect(response.status).to.equal(200);
  });

  it("Should not sign up user when the first name is null", async () => {
    const data = {
      firstName: null,
      lastName: "Dimmidome",
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "First name must be between 1 and 25 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up user when the first name is an empty string", async () => {
    const data = {
      firstName: "",
      lastName: "Dimmidome",
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "First name must be between 1 and 25 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up user when the first name is too long", async () => {
    const data = {
      firstName: "a".repeat(26),
      lastName: "Dimmidome",
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "First name must be between 1 and 25 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up user when the first name has numbers or special characters", async () => {
    const data = {
      firstName: "J0hn!",
      lastName: "Dimmidome",
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "First name can only contain letters."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the last name is null", async () => {
    const data = {
      firstName: "John",
      lastName: null,
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Last name must be between 1 and 25 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the last name is an empty string", async () => {
    const data = {
      firstName: "John",
      lastName: "",
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Last name must be between 1 and 25 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the last name is too long", async () => {
    const data = {
      firstName: "John",
      lastName: "a".repeat(26),
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Last name must be between 1 and 25 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the last name has numbers or special characters", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe123!",
      email: "user@gmail.com",
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Last name can only contain letters."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the username is null", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: null,
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Username must be between 5 and 15 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the username is too short", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "user",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Username must be between 5 and 15 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the username is too long", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "a".repeat(16),
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Username must be between 5 and 15 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not create a user with email as username", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "user@gmail.com",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Username cannot be an email address."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the email is null", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: null,
      username: "user123",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Email must be between 5 and 30 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the email is too short", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "u@gc",
      username: "user",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Email must be between 5 and 30 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the email is too long", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "user12345678912345678@gmail.com",
      username: "user123",
      password: "password1",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Email must be between 5 and 30 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not create a user with invalid email", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "invalidgmail.com",
      username: "user1",
      password: "password123",
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal("Must be a valid email address.");
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the password is null", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "user1",
      password: null,
    };

    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Password must be between 6 and 20 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the password is too short", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "user1",
      password: "pass1",
    };


    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Password must be between 6 and 20 characters long."
    );
    expect(response.status).to.equal(400);
  });

  it("Should not sign up a user when the email is too long", async () => {
    const data = {
      firstName: "John",
      lastName: "Doe",
      email: "user@gmail.com",
      username: "user1",
      password: "a".repeat(21),
    };


    const response = await agent
      .post("/api/users")
      .set("Accept", "application/json")
      .set("XSRF-Token", xsrfToken)
      .send(data);

    const { user, errors } = response.body;

    expect(user).to.not.exist;
    expect(Object.values(errors)[0]).to.equal(
      "Password must be between 6 and 20 characters long."
    );
    expect(response.status).to.equal(400);
  });

});
