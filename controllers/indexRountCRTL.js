'use strict';

const xtpl = require('xtpl');
const path = require('path');
const fs = require('fs');
const moment = require('moment');


// 文件本地目录
const fileUrl="E:\\testPythonFileList";
exports.fileUrlInfo=fileUrl;

// 文件大小设置
const sizeFIle=function(size){
    let _size=Number(size);
    //判断大小有没有超过1  
    if (size<(1024*1024)){  
        _size=`${ Math.floor(size/1024.0)}kb`;
    }else if(1024*1024*1024){     
        _size=`${ Math.floor((size/1024.0)/1024.0)}mb`;  
    }else{  
        _size=`${ Math.floor((size/1024.0/1024.0)/1024.0)}GB`;
    }  
    return _size;  
}

// 获取文件列表
const getAllFile=function(){
    return new Promise((reslve,reject)=>{
        let jsonFiles = [];
        fs.readdir(fileUrl,function(err,files){
            if(err){
                reslve([])
            }
            console.log(files)
            files.forEach(element => {
                fs.stat(`${fileUrl}\\${element}`,function(err,data){
                    if(err){
                        return
                    }
                    if(data.isFile()){
                        let tmp={
                            name:element,
                            createrTime:moment(data.ctime).format('YYYY-MM-DD,h:mm:ss'),
                            time:data.ctime.getTime(),
                            size:`${sizeFIle(data.size)}`
                        }
                        jsonFiles.push(tmp)
                    }
                })
            });
            setTimeout(() => {
                jsonFiles=jsonFiles.sort(function(a,b){
                    return a.time-b.time
                })
                jsonFiles.reverse()
                reslve(jsonFiles)
            },500);
        });
    })
}

// 文件上传
exports.updataFile=(req,res)=>{
    console.log("我调用了上传")
    let tmp={
        code:200,
        data:{}
    }
    if (!req.files) { // 末上传文件的返回
        tmp.code=300;
        res.json(tmp);
        return;
      }
    //有上传文件,返回文件列表
    res.json(tmp) 
    return;
}

// 文件下载
exports.downFile=(req,res)=>{
    console.log("我调用了下载")
    console.log(req.query)
    console.log(req.query.name)
    let fileName=req.query.name;
    console.log(fileUrl+"\\"+fileName)
    getAllFile().then(listdata=>{
        listdata.forEach(element => {
            if(element.name==fileName){
                fs.readFile(fileUrl+'\\'+fileName,function(err,data){
                    console.log("文件信息")
                    console.log(data)
                    let tmp={
                        name:fileName,
                        buffer:data
                    }
                    res.send(tmp);
                });
            }
        });
    })
    return;
}

// 跳转页面
exports.getIndexPage = (req, res) => {
    getAllFile().then(listdata=>{
        xtpl.renderFile(path.join(__dirname, '../view/index.html'), {
            fileList: listdata,
            loginedName: req.session.username
        }, (err, content) => {
            res.send(content);
        })  
    })
}

// 获取文件列表
exports.getData = (req, res) => {
    const keyword = req.query.keyword || '';
    // 获取post提交过来的参数
    const params = req.body;
    xtpl.renderFile(path.join(__dirname, '../view/list.html'), {
        students: '1111',
        keyword: keyword,
        loginedName: req.session.username
    }, (err, content) => {
        res.send(content);
    })
}