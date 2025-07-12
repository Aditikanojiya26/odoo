const multer = require("multer");
const path = require("path");
const fs = require("fs");

const createUploadPath = (folder) => {
  const uploadPath = path.join(__dirname, `../uploads/${folder}`);
  if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
  }
  return uploadPath;
};

// Avatar Storage
const avatarStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, createUploadPath("avatars"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Item Image Storage
const itemStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, createUploadPath("items"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploadAvatar = multer({ storage: avatarStorage });
const uploadItemImages = multer({ storage: itemStorage });

module.exports = {
  uploadAvatar,
  uploadItemImages,
};
