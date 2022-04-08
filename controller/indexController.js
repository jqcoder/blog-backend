const path = require('path');

const indexController = {};

const query = require('../model/query.js');


indexController.index = async (req, res) => {
    res.render(path.resolve('views', 'index.html'));
}

indexController.login = (req, res) => {
    res.sendFile(path.resolve('views', 'login.html'));
}

indexController.test = (req, res) => {
    res.sendFile(path.resolve('views', 'test.html'));
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