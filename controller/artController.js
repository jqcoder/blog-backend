const path = require('path');
const fs = require('fs')
const query = require('../model/query');
const moment = require('moment');

const artController = {};

artController.index = (req, res) => {
    res.render(path.resolve('views', 'articlelist.html'));
}

artController.addArticle = (req, res) => {
    res.render(path.resolve('views', 'addArticle.html'));
}

artController.editArt = async (req, res) => {
    let { id } = req.query;
    const sql = `select * from article where id = ${id}`;
    let artData = await query(sql);
    res.render(path.resolve('views', 'editArt.html'), artData[0]);
}

artController.getArtAllData = async (req, res) => {
    let { keyword } = req.query
    // 获取总数
    let sql = `SELECT COUNT(t1.cate_id) as total FROM article t1 where 1`;
    if (keyword) {
        sql += ` and title like '%${keyword}%'`;
    }
    let [count] = await query(sql);
    count = count.total;

    // 获取文章
    let { page, limit } = req.query;
    let pageNum = (page - 1) * limit;
    let artsql = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 LEFT JOIN category t2 on t1.cate_id = t2.cate_id LEFT JOIN users t3 on t1.author = t3.id where 1`;
    if (keyword) {
        artsql += ` and title like '%${keyword}%'`;
    }
    artsql += ` ORDER BY t1.id desc LIMIT ${pageNum}, ${limit}`

    let artResult = await query(artsql);
    let data = artResult.map(item => {
        item.status = item.status ? '上线' : '下线'
        item.cate_name = item.cate_name ? item.cate_name : '未分类'
        return item
    })

    res.json({
        count,
        data,
        code: 0
    })
}

artController.delArtData = async (req, res) => {
    let { id, pic } = req.query
    const delSql = `delete from article where id = ${id}`;
    let result = await query(delSql);
    const resObj = {
        code: 201,
        message: '删除失败'
    }
    if (result.affectedRows > 0) {
        resObj.code = 200
        resObj.message = '删除成功';
        if (fs.existsSync(`${pic}`.substring(1,))) {
            fs.unlink(`${pic}`.substring(1,), (err) => {
                if (err) { throw err };
            })
        } else {
            console.log('删除的原照片不存在');
        }
    }
    res.json(resObj);
}

artController.addArtData = async (req, res) => {
    // 获取数据
    let { title, cate_id, status, content } = req.body;
    let author = req.session.userInfo.id
    let pic = req.filename;
    let add_date = moment().format('YYYY-MM-DD HH:mm:ss')

    const sql = `insert into article(title, content, cate_id, status, author,pic,add_date) values 
    ('${title}','${content}',${cate_id},${status},${author},'${pic}','${add_date}')`
    let result = await query(sql);
    const resObj = {
        code: 200,
        message: '添加成功'
    }

    if (result.affectedRows < 1) {
        resObj.code = 201
        resObj.message = '添加失败'
    }
    res.json(resObj);
}

artController.editArtData = async (req, res) => {
    let { title, content, status, cate_id, isUpdPic, id, oldpic } = req.body
    let author = req.session.userInfo.id;
    let sql = `update article set title = '${title}', content = '${content}', author=${author},status = ${status},cate_id=${cate_id} `
    if (isUpdPic == 1) {
        sql += `,pic='${req.filename}' `;
        if (fs.existsSync(`${oldpic}`.substring(1,))) {
            fs.unlink(`${oldpic}`.substring(1,), (err) => {
                if (err) { throw err };
            })
        } else {
            console.log('编辑的原照片不存在');
        }
    }
    sql += ` where id = ${id}`;
    let updRes = await query(sql);
    const resObj = {
        code: 200,
        message: '更新成功'
    }
    if (updRes.affectedRows < 1) {
        resObj.code = 201
        resObj.message = '更新失败'
    }
    res.json(resObj)
}

module.exports = artController;