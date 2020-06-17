'use stric';

const express=require('express');
const path=require('path');
const fs = require('fs');
const multer = require('multer');
const moment = require('moment');

const indexRouter = express.Router();
const indexRouterCRTL = require(path.join(__dirname, '../controllers/indexRountCRTL.js'));

/*
 新建一个multer中间件，设置文件保存路径
 路径必须存在，否则会报错
*/
const storage = multer.diskStorage({
    //设置上传后文件路径，uploads文件夹会自动创建。
    destination: function (req, file, cb) {
        cb(null, indexRouterCRTL.fileUrlInfo)
    }, 
    //给上传文件重命名，获取添加后缀名
     filename: function (req, file, cb) {
        console.log(file)
        let fileFormat = (file.originalname).split(".");
        fs.readdir(indexRouterCRTL.fileUrlInfo,function(err,files){
            // cb(null, fileFormat[0] + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
            cb(null, fileFormat[0] + '-' + moment(Date.now()).format('YYYY年MM月DD日h时mm分ss秒') + "." + fileFormat[fileFormat.length - 1]);
        })
    }
});  
const upload = multer({ storage: storage}); 

// 获取首页页面
indexRouter.get('/',indexRouterCRTL.getIndexPage);

// 查询
indexRouter.get('/searList',indexRouterCRTL.searchList);

// 上传文件
indexRouter.post('/updataFile',upload.array('file'),indexRouterCRTL.updataFile)

// 下载文件
indexRouter.get('/downFile',indexRouterCRTL.downFile)


module.exports = indexRouter;