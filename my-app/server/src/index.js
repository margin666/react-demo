const express = require('express')
const app = express()
const file_save = require('./router/file-save');//文件保存


app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header('Access-Control-Allow-Headers', 'application/x-www-form-urlencoded');
    res.header('Access-Control-Allow-Headers', '*');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    // res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();
});


app.use('/file', file_save)


app.listen(3030)