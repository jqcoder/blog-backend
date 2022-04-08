const express = require('express');
const router = express.Router();

const indexController = require('../controller/indexController.js');
const cateController = require('../controller/cateController.js');
const artController = require('../controller/artController.js');

// 主页
router.get('/', indexController.index);

// 登录页
router.get('/login', indexController.login);

// 文章列表
router.get('/artlist', artController.index);

// 分类列表
router.get('/catelist', cateController.index);

// 测试列表
router.get('/test', indexController.test);

// 登录验证
router.post('/islogin', indexController.islogin);

module.exports = router;