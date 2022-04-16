const path = require('path');
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const router = require('./router/router.js');
const frontendRouter = require('./router/frontendRouter.js');
const express_template = require('express-art-template');
const testLogin = require('./middleware/testLogin.js')
const updateConfig = require('./config/updateConfig.js');

const session = require('express-session');
app.use(session({
    name: 'session_login',
    secret: "$kasmk22s&kasnnnsSn*%sj52",
    cookie: {
        path: '/',
        maxAge: 60000 * 23
    }
}))

// 上传文件
const storage = multer.diskStorage(updateConfig);

//跨域
app.use(cors());

// 前台路由
app.use('/index', frontendRouter);
app.use('/pic', express.static(path.resolve('pic/')));

// 防止翻墙
app.use(testLogin)


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
app.use(router);

const { SERVER_PORT } = require('./config/config.js');

app.listen(SERVER_PORT, () => {
    console.log(`port is ${SERVER_PORT}`);
})