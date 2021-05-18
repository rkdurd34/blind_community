const multer = require('multer');
const businessImgStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'media/img');
  },
  // filename(req, file, cb) {
  //   console.log(req,"ㅁㅇㄴㅁㄴㅇ");
  //   console.log(file, 'ㅁ어문아ㅓ무나ㅓ우마ㅓ누아무나어ㅜ마ㅓㄴ우ㅏㅁ누ㅏㅓㅇ');
  //   cb(null, `${file.originalname}`);
  // }
});
const testUpload = multer(
  {
    storage: multer.memoryStorage(),
    // limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 } 
  });

const businessImgUpload = multer({ businessImgStorage });

module.exports = { businessImgUpload, testUpload };