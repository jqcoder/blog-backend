const path = require('path');
const express = require('express');
const app = express();

// 托管静态文件
app.use('/assets', express.static(path.resolve('assets/')));

// 路由
const router = require('./router/router.js');
app.use(router);



app.listen(3800, () => {
    console.log('port is 3800');
})