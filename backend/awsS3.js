const AWS = require("aws-sdk");
const NAME_OF_BUCKET = "study-buddy-pdf-files";
const multer = require("multer");

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });

// --------------------------- Public UPLOAD ------------------------

const uploadAWSFile = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const path = require("path");
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const uploadParams = {
    Bucket: NAME_OF_BUCKET,
    Key,
    Body: buffer,
    ACL: "public-read",
  };
  const result = await s3.upload(uploadParams).promise();

  return result.Location;
};

// --------------------------- DELETE OBJECT ------------------------

const deleteAWSFile = async (fileUrl) => {
  const key = fileUrl.split("/")[3];
  const params = {
    Bucket: NAME_OF_BUCKET,
    key,
  };
  try {
    await s3.deleteObject(params).promise();
  } catch (err) {
    console.log(err, err.stack);
  }
};

// --------------------------- Storage ------------------------

const storage = multer.memoryStorage({
  destination: function (req, file, callback) {
    callback(null, "");
  },
});

const handleMulterFile = (nameOfKey) => {
  return multer({ storage: storage }).single(nameOfKey);
};

module.exports = {
  s3,
  handleMulterFile,
  uploadAWSFile,
  deleteAWSFile
};
