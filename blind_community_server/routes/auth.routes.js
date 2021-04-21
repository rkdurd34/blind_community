const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

// const { checkShop, apiTrackingShop } = require('../middlewares/auth')
router.post('/signup', auth.signup); // 로그인
router.post('/signin', auth.signin); // 로그인
router.delete('/signout', auth.signout); // 로그인


module.exports = router;