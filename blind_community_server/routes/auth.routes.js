const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

// const { checkShop, apiTrackingShop } = require('../middlewares/auth')
router.post('/signup', auth.signUp); // 로그인
router.post('/login', auth.login); // 로그인


module.exports = router;