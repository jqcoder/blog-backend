const path = require('path');

module.exports = {
    destination: function (req, file, cb) {
        cb(null, 'pic/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        req.filename = `/pic/${uniqueSuffix}`;
        cb(null, uniqueSuffix)
    }
}