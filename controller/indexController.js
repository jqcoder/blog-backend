const path = require('path');
const query = require('../model/query.js');

const indexController = {};

indexController.index = async (req, res) => {
    res.render(path.resolve('views', 'index.html'));
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

module.exports = indexController;