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
    let { cate_id, cate_name, orderBy } = req.body;

    let sql = `update category set cate_name = '${cate_name}',orderBy = ${orderBy} where cate_id = ${cate_id}`;

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

cateController.addcCateData = async (req, res) => {
    let { cate_name, orderBy } = req.body;
    const sql = `insert into category (cate_name, orderBy ) values ('${cate_name}',${orderBy} )`;
    let addRes = await query(sql);
    const resObj = {
        code: 200,
        message: '添加成功'
    }
    if (addRes.affectedRows < 1) {
        resObj.code = 201
        resObj.message = '添加失败'
    }
    res.json(resObj);
}

cateController.getCateTotal = async (req, res) => {
    const sql = `SELECT COUNT(t1.cate_id) total,t2.cate_name FROM article t1 LEFT JOIN category t2 on t1.cate_id = t2.cate_id GROUP BY t1.cate_id`;
    let result = await query(sql);
    res.json({ result })
}


module.exports = cateController;