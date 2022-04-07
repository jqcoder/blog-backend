const path = require('path');

const indexController = {};

const query = require('../model/query.js')


indexController.index = async (req, res) => {
    res.sendFile(path.resolve('views', 'index.html'));
}


indexController.login = (req, res) => {
    res.sendFile(path.resolve('views', 'login.html'));
}

module.exports = indexController;