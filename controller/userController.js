const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const query = require('../model/query.js');
const { password_secret } = require('../config/md5Config.js');


const loginController = {};

loginController.index = (req, res) => {
    if (req.session.userInfo) {
        res.redirect('/')
    }
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


loginController.setUsetInfo = async (req, res) => {
    let { id, username, intro } = req.body;
    const sql = `update users set username = '${username}',intro = '${intro}' where id = ${id}`;
    let updateRes = await query(sql);
    const resObj = {
        code: 201,
        message: '修改失败'
    }
    if (updateRes.affectedRows > 0) {
        resObj.code = 200
        resObj.message = '修改成功'
        const sql = `select * from users where id = ${id}`;
        let result = await query(sql);
        res.cookie('userinfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        });
    }
    res.json(resObj);
}

loginController.updatePic = async (req, res) => {
    let { id, oldpic } = req.body;
    const sql = `update users set avatar = '${req.filename}' where id = ${id}`
    let updateRes = await query(sql);
    const resObj = {
        code: 201,
        message: '修改失败'
    }
    if (updateRes.affectedRows > 0) {
        resObj.code = 200
        resObj.message = '修改成功'
        resObj.pic = `/pic/${req.filename}`
        const sql = `select * from users where id = ${id}`;
        let result = await query(sql);
        res.cookie('userinfo', JSON.stringify(result[0]), {
            expires: new Date(Date.now() + 1 * 3600000),
        });

        // 删除原来头像
        if (fs.existsSync('/pic/${oldpic}')) {
            fs.unlink(`pic/${oldpic}`, (err) => {
                if (err) { throw err };
            })
        } else {
            console.log('原照片不存在');
        }
    }
    res.json(resObj);
}



module.exports = loginController;