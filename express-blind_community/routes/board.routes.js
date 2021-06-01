const express = require('express');
const router = express.Router();
const board = require('../controllers/board.controller');
const { checkUser } = require('../middlewares/auth');


// const { checkShop, apiTrackingShop } = require('../middlewares/auth')
// router.post('/signup', businessImgUpload.single('image'), auth.signup); // 회원가입
// router.post('/signin', auth.signin); // 로그인
// router.delete('/signout', auth.signout); // 로그인
// router.post('/signin', auth.signin); // 로그인
// router.get("/signup/type/first", auth.typeDataFirst);
// router.get("/signup/type/second", auth.typeDataSecond);
// router.get("/signup/type/third", auth.typeDataThird);

router.get('/main', checkUser, board.mainPage);
router.get('/all', checkUser, board.postListAll);
router.get('/post/detail', checkUser, board.postDetail);
router.get('/type/data', checkUser, board.typeData);
router.post('/post/create', checkUser, board.postCreate);
router.patch('/post/edit', checkUser, board.postEdit);
router.post(`/post/like`, checkUser, board.postLike);
router.post(`/post/comment`, checkUser, board.commentCreate);
router.get('/post/comment', checkUser, board.commentMore);
router.get('/post/search', checkUser, board.searchData);
router.delete('/post/delete', checkUser, board.postDelete);
router.get('/post/views', checkUser, board.updateViews);

router.get('/post/best',checkUser,board.bestPost)
router.delete('/comment/delete',checkUser,board.deleteComment)



module.exports = router;