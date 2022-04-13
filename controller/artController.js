const path = require('path');
const query = require('../model/query');

const artController = {};

artController.index = (req, res) => {
    res.render(path.resolve('views', 'articlelist.html'));
}

artController.getArtAllData = async (req, res) => {
    // 总数
    const sql = `SELECT COUNT(t1.cate_id) as total FROM article t1`
    let [count] = await query(sql);
    count = count.total;

    // 文章

    let { page, limit } = req.query;
    let pageNum = (page - 1) * limit;
    const artsql = `SELECT t1.*,t2.cate_name FROM article t1 LEFT JOIN category t2 on t1.cate_id = t2.cate_id ORDER BY t1.id ASC LIMIT ${pageNum}, ${limit}`;
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

module.exports = artController;