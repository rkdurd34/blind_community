const multer = require('multer');
const businessImgStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'media/img');
  },
  filename(req, file, cb) {
    cb(null, `${file.originalname}`);
  }
});
const testUpload = multer(
  {
    storage: multer.memoryStorage(),
    // limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 } 
  });

const businessImgUpload = multer({ storage: businessImgStorage });

module.exports = { businessImgUpload, testUpload };