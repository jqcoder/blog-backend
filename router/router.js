const express = require('express');
const router = express.Router();

const indexController = require('../controller/indexController.js');
const cateController = require('../controller/cateController.js');
const artController = require('../controller/artController.js');
const userController = require('../controller/userController.js');

//页面:
// 后台主页
router.get('/', indexController.index);
// 登录页
router.get('/login', userController.index);
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
// 添加分类数据
router.post('/addcCateData', cateController.addcCateData);

// 系统:
// 设置系统页
router.get('/editsystem', indexController.editsystem);
// 获取系统设置
router.get('/getSysSettings', indexController.getSysSettings);
// 设置系统设置
router.post('/setSysSettings', indexController.setSysSettings);

// 登录验证
router.post('/islogin', userController.islogin);
// 退出登录
router.get('/userExit', userController.userExit);

module.exports = router;