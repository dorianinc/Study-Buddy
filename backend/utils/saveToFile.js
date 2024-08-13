const fs = require("fs");
const path = require("path");

// Function to write data to a JSON file
const saveToFile = (type, data) => {
  // Ensure the request has data
  if (!data) {
    console.error("Invalid data format. Expected an array of objects.");
    return;
  }

  // Define the output directory and filename relative to this file
  const directory = path.join(__dirname, "data"); // Directory relative to the location of this file
  const filename = `${type}.json`;
  const filePath = path.join(directory, filename);

  // Ensure the directory exists
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }

  // Read existing data from the file if it exists
  let existingData = [];
  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    try {
      existingData = JSON.parse(fileContent);
      if (!Array.isArray(existingData)) {
        existingData = [existingData]; // Ensure it's an array if it wasn't before
      }
    } catch (err) {
      console.error("Error reading or parsing existing file content:", err);
      return;
    }
  }

  // Merge new data with existing data
  const newData = Array.isArray(data) ? data : [data];
  const updatedData = existingData.concat(newData);

  // Convert the updated data to JSON format with pretty printing
  const jsonData = JSON.stringify(updatedData, null, 2);

  // Write updated JSON data to the file
  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
    } else {
      console.log(`File written successfully to ${filePath}`);
    }
  });
};

module.exports = saveToFile;
