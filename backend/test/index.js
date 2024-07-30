const Mocha = require("mocha");
const path = require("path");

const mocha = new Mocha();

// Add test files here
const testFiles = [
  path.join(__dirname, "buildDB.js"),
  // path.join(__dirname, "models", "userModel.test.js"),
  // path.join(__dirname, "models", "folderModel.test.js"),
  // path.join(__dirname, "models", "documentModel.test.js"),
  // path.join(__dirname, "models", "noteModel.test.js"),
  path.join(__dirname, "routes", "userRoutes.test.js"),
  // path.join(__dirname, "routes", "folderRoutes.test.js"),
];
// Add each test file to Mocha
testFiles.forEach((file) => mocha.addFile(file));

// Run the tests
mocha.run((failures) => {
  process.exitCode = failures ? 1 : 0;
});
