const express = require('express');
const router = express.Router();

const indexController = require('../controller/indexController.js');
const cateController = require('../controller/cateController.js');
const artController = require('../controller/artController.js');

//页面:
// 后台主页
router.get('/', indexController.index);
// 登录页
router.get('/login', indexController.login);
// 文章列表页
router.get('/artlist', artController.index);
// 分类列表页
router.get('/catelist', cateController.index);


// 分类:
// 获取分类数据
router.get('/cateData', cateController.cateData);
// 修改分类数据
router.post('/UpdateCateData', cateController.UpdateCateData);
// 删除分类数据
router.get('/deteleCateData', cateController.deteleCateData);


// 登录验证
router.post('/islogin', indexController.islogin);

module.exports = router;