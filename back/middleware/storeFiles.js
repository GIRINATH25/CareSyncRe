const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname+path.extname(file.originalname));
  },
});


const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10, 
  }
});

module.exports = upload;
