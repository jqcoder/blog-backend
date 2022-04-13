const express = require('express');
const router = express.Router();
const multer = require('multer');
const updateConfig = require('../config/updateConfig.js')

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
// 获取所有分类数据
router.get('/cateData', cateController.cateData);
// 修改分类数据
router.post('/UpdateCateData', cateController.UpdateCateData);
// 删除分类数据
router.get('/deteleCateData', cateController.deteleCateData);
// 添加分类数据
router.post('/addcCateData', cateController.addcCateData);
// 添加分类数据
router.get('/getCateTotal', cateController.getCateTotal);

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

// 上传文件

const storage = multer.diskStorage(updateConfig);
const upload = multer({ storage: storage });

// 用户
// 修改用户信息
router.post('/setUsetInfo', userController.setUsetInfo);
// 更新用户头像
router.post('/updatePic', upload.single('pic'), userController.updatePic);


// 文章
// 获取文章table参数
router.get('/getArtAllData', artController.getArtAllData)

module.exports = router;