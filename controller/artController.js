const path = require('path');

const artController = {};


artController.index = (req, res) => {
    res.render(path.resolve('views', 'articlelist.html'));
}


module.exports = artController;