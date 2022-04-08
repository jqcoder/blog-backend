const path = require('path');

const cateController = {};


cateController.index = (req, res) => {
    res.render(path.resolve('views', 'catelist.html'));
}


module.exports = cateController;