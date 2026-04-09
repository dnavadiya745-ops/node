const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// process your file upload and save into storage 
// you can save your file into two place : 
// 1. into server(diskStorage)
// 2. cloud storage (like AWS S3)

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null,path.join(__dirname,"../public/uploads"))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = crypto.randomBytes(7).toString("hex") + path.extname(file.originalname);
    cb(null, uniqueSuffix)
  }
})

const upload = multer({ storage: storage })

module.exports = upload;