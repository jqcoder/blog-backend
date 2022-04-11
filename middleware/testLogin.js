module.exports = (req, res, next) => {
    let reqPath = req.path;
    let reg = /^(\/static)/;
    let white = ['/login', '/islogin'];
    if (reg.test(reqPath) || white.includes(reqPath)) {
        next();
    } else {
        if (req.session.userInfo) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}