const path = require("path");
const multer = require("multer");
const {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const bucket = process.env.S3_BUCKET;
const region = process.env.S3_REGION;
const s3client = new S3Client({
  apiVersion: "2006-03-01",
  region,
});

// --------------------------- Public UPLOAD ------------------------

const uploadAWSFile = async (file) => {
  const { originalname, mimetype, buffer } = await file;
  const Key = new Date().getTime().toString() + path.extname(originalname);
  const params = {
    Bucket: bucket,
    Key,
    Body: buffer,
    ACL: "public-read",
    ContentType: mimetype,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3client.send(command);
    return `https://${bucket}.s3.${region}.amazonaws.com/${Key}`;
  } catch (err) {
    console.error(err);
  }
};

// --------------------------- DELETE OBJECT ------------------------

const deleteAWSFile = async (fileUrl) => {
  const key = fileUrl.split("/").pop();
  const params = {
    Bucket: bucket,
    Key: key,
  };

  try {
    const command = new DeleteObjectCommand(params);
    await s3client.send(command);
  } catch (err) {
    console.log("Error", err);
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
  s3client,
  handleMulterFile,
  uploadAWSFile,
  deleteAWSFile,
};
