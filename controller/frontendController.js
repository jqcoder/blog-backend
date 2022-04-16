const query = require("../model/query");

const frontendController = {};

frontendController.getAllCate = async (req, res) => {
    const sql = `select * from category`;
    let result = await query(sql);
    res.json(result);
}

frontendController.getArt = async (req, res) => {
    let { page, limit, id, cate_id } = req.query;
    if (id) {
        // 查指定文章
        const sql = `select t1.*,t2.cate_name from article t1 left join
                    category t2 on t1.cate_id = t2.cate_id where t1.id = ${id}`
        let result = await query(sql);
        res.json(result);
    } else if (cate_id) {
        // 查指定分类的文章
        const sql = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 LEFT JOIN category t2 ON
                    t1.cate_id = t2.cate_id LEFT JOIN users t3 ON 
                    t1.author = t3.id where t1.cate_id = ${cate_id}
                     ORDER BY t1.id DESC  LIMIT ${page},${limit}`;
        let result = await query(sql);
        // 
        res.json(result);
    } else {
        // 查所有的文章
        const sql = `SELECT t1.*,t2.cate_name,t3.username FROM article t1 LEFT JOIN category t2 ON
                    t1.cate_id = t2.cate_id LEFT JOIN users t3 ON 
                    t1.author = t3.id ORDER BY t1.id DESC  LIMIT ${page},${limit}`;

        let result = await query(sql);
        res.json(result);
    }

}

module.exports = frontendController;