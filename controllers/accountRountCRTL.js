'use strict';

const path = require('path');
const fs = require('fs');
const md5 = require(path.join(__dirname, "../statics/js/md5"));

// 跳转登录页面
exports.getLoinPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../view/login.html'));
}

// 登录验证
exports.login = (req, res) => {
    // 获取post提交过来的参数
    const params = req.body;
    const result = {
        status: 2,
        message: '登录成功!'
    };
    // 验证登录的用户名和密码
    let username=md5.md5(params.username)
    let password=md5.md5(params.password)
    if(username=="c5edac1b8c1d58bad90a246d8f08f53b"&&password=="c7fdff4675933ab1ec55925f3d29dcbc"){
        req.session.username = params.username;
    }else{
        result.status = 1;
        result.message = "用户名或密码错误"
    }
    res.json(result);
}
// 退出
exports.logout = (req, res) => {
    console.log(`黜退`)
    req.session.username = null;
    //退出后跳回到登录页面
    res.setHeader("Content-Type", "text/html;charset=utf-8")
    res.end("<script>window.location.href='/account/login'</script>")
}