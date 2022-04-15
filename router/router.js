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
// 添加文章页
router.get('/addArticle', artController.addArticle);
// 编辑文章页
router.get('/editArt', artController.editArt);



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


// 上传文件
const storage = multer.diskStorage(updateConfig);
const upload = multer({ storage: storage });

// 系统:
// 设置系统页
router.get('/editsystem', indexController.editsystem);
// 获取系统设置
router.get('/getSysSettings', indexController.getSysSettings);
// 设置系统设置
router.post('/setSysSettings', upload.single('pic'), indexController.setSysSettings);

// 登录验证
router.post('/islogin', userController.islogin);
// 退出登录
router.get('/userExit', userController.userExit);



// 用户
// 修改用户信息
router.post('/setUsetInfo', userController.setUsetInfo);
// 更新用户头像
router.post('/updatePic', upload.single('pic'), userController.updatePic);
// 更新密码
router.post('/setNewPW', userController.setNewPW);


// 文章
// 获取文章table参数
router.get('/getArtAllData', artController.getArtAllData);
// 删除文章
router.get('/delArtData', artController.delArtData);
// 添加文章
router.post('/addArtData', upload.single('pic'), artController.addArtData);
// 编辑文章
router.post('/editArtData', upload.single('pic'), artController.editArtData);



module.exports = router;