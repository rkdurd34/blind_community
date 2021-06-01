const express = require('express');
const router = express.Router();
const mypage = require('../controllers/mypage.controller');
const { checkUser } = require('../middlewares/auth');


// const { checkShop, apiTrackingShop } = require('../middlewares/auth')
// router.post('/signup', businessImgUpload.single('image'), auth.signup); // 회원가입
// router.post('/signin', auth.signin); // 로그인
// router.delete('/signout', auth.signout); // 로그인
// router.post('/signin', auth.signin); // 로그인
// router.get("/signup/type/first", auth.typeDataFirst);
// router.get("/signup/type/second", auth.typeDataSecond);
// router.get("/signup/type/third", auth.typeDataThird);

// router.get('/main', checkUser, board.mainPage);
// router.get('/all', checkUser, board.postListAll);
// router.get('/post/detail', checkUser, board.postDetail);
// router.get('/type/data', checkUser, board.typeData);
// router.post('/post/create', checkUser, board.postCreate);
// router.post(`/post/like`,checkUser, board.postLike)
// router.post(`/post/comment`,checkUser, board.commentCreate)

// router.get('/', checkUser, mypage.userData);

module.exports = router;