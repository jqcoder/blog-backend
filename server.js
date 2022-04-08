const path = require('path');
const express = require('express');
const app = express();
const artTemplate = require('art-template');
const express_template = require('express-art-template');


//配置模板的路径
app.set('views', __dirname + '/views/');
//设置express_template模板后缀为.html的文件(不设这句话，模板文件的后缀默认是.art)
app.engine('html', express_template);
//设置视图引擎为上面的html
app.set('view engine', 'html');

// 托管静态文件
app.use('/static', express.static(path.resolve('static/')));

//解析表单
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
const router = require('./router/router.js');
app.use(router);



app.listen(3800, () => {
    console.log('port is 3800');
})