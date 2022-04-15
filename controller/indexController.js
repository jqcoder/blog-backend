const path = require('path');
const fs = require('fs');
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

// 设置系统设置
indexController.setSysSettings = async (req, res) => {
    let { blog_name, oldpic } = req.body;
    const sql1 = `update settings set val = '${blog_name}' where id = 1`;
    let sql2
    if (req.filename) {
        sql2 = `update settings set val = '${req.filename}' where id = 2`;
        let logodateRes = query(sql2);
        if (fs.existsSync(`${oldpic}`.substring(1,))) {
            fs.unlink(`${oldpic}`.substring(1,), (err) => {
                if (err) { throw err };
            })
        } else {
            console.log('删除的原照片不存在');
        }
    }
    let namedateRes = await query(sql1);

    const resObj = {
        code: 200,
        message: '修改成功',
        pic: req.filename
    }
    if (namedateRes.affectedRows < 1 && logodateRes.affectedRows < 1) {
        resObj.code = 201
        resObj.message = '修改失败'
    }
    res.json(resObj);
}

module.exports = indexController;