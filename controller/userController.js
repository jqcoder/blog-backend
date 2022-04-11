const path = require('path');
const md5 = require('md5');
const query = require('../model/query.js');
const { password_secret } = require('../config/md5Config.js');

const loginController = {};



loginController.index = (req, res) => {
    res.sendFile(path.resolve('views', 'login.html'));
}

loginController.islogin = async (req, res) => {
    let { username: UN, password: PW } = req.body;
    // 密码加密（md5）
    PW = md5(`${PW}${password_secret}`);
    const sql = `select * from users where username = '${UN}' and password = '${PW}'`;
    let result = await query(sql);
    if (result.length > 0) {
        req.session.userInfo = result[0];
        res.cookie('userinfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        })
        res.json({
            code: 200,
            massage: '登录成功'
        })
    } else {
        res.json({
            code: 201,
            massage: '登录失败'
        })
    }
}

loginController.userExit = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.json({
                code: 201,
                message: '退出失败'
            })
            throw err;
            return;
        }
        res.json({
            code: 200,
            message: '退出成功'
        })
    });
}



module.exports = loginController;