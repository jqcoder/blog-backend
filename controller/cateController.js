const path = require('path');
const query = require('../model/query.js');

const cateController = {};



cateController.index = (req, res) => {
    res.render(path.resolve('views', 'catelist.html'));
}

cateController.cateData = async (req, res) => {
    const sql = `select * from category`;
    let queryRes = await query(sql);
    res.json({
        code: 0,
        message: 'success',
        data: queryRes
    });
}

cateController.UpdateCateData = async (req, res) => {
    let { id, editKey, editValue } = req.body;
    let sql;
    if (editKey === 'cate_name') {
        sql = `update category set ${editKey}='${editValue}' where cate_id = ${id}`;
    } else {
        sql = `update category set ${editKey}= ${editValue} where cate_id = ${id}`;
    }
    let updateRes = await query(sql);
    const resObj = {
        code: 200,
        message: '修改成功'
    }
    if (updateRes.affectedRows < 1) {
        resObj.code = 201
        resObj.message = '修改失败'
    }
    res.json(resObj);
}

cateController.deteleCateData = async (req, res) => {
    let { id } = req.query;
    const sql = `delete from category where cate_id = ${id}`;
    let deleteRes = await query(sql);
    const resObj = {
        code: 200,
        message: '删除成功'
    }
    if (deleteRes.affectedRows < 1) {
        resObj.code = 201
        resObj.message = '删除失败'
    }
    res.json(resObj);
}


module.exports = cateController;