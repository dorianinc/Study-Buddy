const fs = require('fs').promises;
const path = require('path');

const saveToFile = (type, data) => {
  // Ensure the request has data
  return;
  if (!data) {
    console.error("Invalid data format. Expected an array of objects.");
    return;
  }

  console.log(`❗❗❗ Creating entry for ${type} ❗❗❗`);

  // Define the output directory and filename relative to this file
  const directory = path.join(__dirname, '..', 'data');
  const filename = `${type}.json`;
  const filePath = path.join(directory, filename);

  // Function to perform the actual file saving
  const performSave = async () => {
    console.log("========== in perform save --------")
    try {
      // Ensure the directory exists
      await fs.mkdir(directory, { recursive: true });

      // Read existing data from the file if it exists
      let existingData = [];
      try {
        await fs.access(filePath); // Check if file exists
        const fileContent = await fs.readFile(filePath, 'utf-8');
        existingData = JSON.parse(fileContent);
        console.log("❗❗❗ console 1")
        if (!Array.isArray(existingData)) {
        console.log("❗❗❗ console 2")

          existingData = [existingData]; // Ensure it's an array if it wasn't before
        }
      } catch (err) {

        if (err.code !== 'ENOENT') { // File does not exist error
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
      await fs.writeFile(filePath, jsonData);
      console.log(`❗❗❗ File written successfully to ${filePath}`);

    } catch (err) {
      console.error("❗❗❗ Error during file operation:", err);
    }
  };

  // Start the file-saving process but don't wait for it to complete
  performSave().catch(err => console.error("Unhandled error:", err));
};


module.exports = saveToFile;
