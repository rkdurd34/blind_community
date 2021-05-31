const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const { checkUser } = require('../middlewares/auth');
const { businessImgUpload, testUpload } = require('../utils/multer');

// const { checkShop, apiTrackingShop } = require('../middlewares/auth')
router.post('/signup',
  businessImgUpload.single('image'),
  // testUpload.single('image'),
  auth.signup); // 회원가입
router.post('/signin', auth.signin); // 로그인
router.delete('/signout', auth.signout); // 로그인
router.post('/signin', auth.signin); // 로그인
router.get("/signup/type/first", auth.typeDataFirst);
router.get("/signup/type/second", auth.typeDataSecond);
router.get("/signup/type/third", auth.typeDataThird);

router.get('/mypage', checkUser, auth.myPageData);
router.post('/mypage', checkUser, auth.myPageEdit);

router.get('/test', checkUser, auth.authAPI);

router.get('/test/data', auth.insertRawData);
module.exports = router;