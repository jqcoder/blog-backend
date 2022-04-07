const express = require('express');
const router = express.Router();

const indexController = require('../controller/indexController.js');

// 主页
router.get('/', indexController.index);

// 登录页
router.get('/login', indexController.login);

module.exports = router;