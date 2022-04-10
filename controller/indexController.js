const path = require('path');

const indexController = {};

const query = require('../model/query.js');


indexController.index = async (req, res) => {
    res.render(path.resolve('views', 'index.html'));
}

indexController.login = (req, res) => {
    res.sendFile(path.resolve('views', 'login.html'));
}

indexController.editsystem = (req, res) => {
    res.render(path.resolve('views', 'aditsystem.html'));
}

indexController.getSysSettings = async (req, res) => {
    const sql = `select * from settings`;
    let result = await query(sql);
    res.json(result);
}

indexController.setSysSettings = async (req, res) => {
    let { blog_name } = req.body;
    const sql = `update settings set val = '${blog_name}' where id = 1`;
    let deletedateRes = await query(sql);
    const resObj = {
        code: 200,
        message: '修改成功'
    }
    if (deletedateRes.affectedRows < 1) {
        resObj.code = 201
        resObj.message = '修改失败'
    }
    res.json(resObj);
}



indexController.islogin = async (req, res) => {
    let { UN, PW } = req.body;
    const sql = `select username,password from users`;
    let result = await query(sql);
    let isUser = result.find(user => {
        if (UN === user.username && PW === user.password) {
            return true;
        }
        return false;
    })
    const status = {
        code: 200,
        massage: '登录成功'
    }
    if (!isUser) {
        status.code = 201;
        status.massage = '登录失败'
    }
    res.json(status);
}

module.exports = indexController;