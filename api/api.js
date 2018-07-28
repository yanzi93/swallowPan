/*
数据接口主文件
*/
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer  = require('multer');
const fs = require('fs');

const userinfo_table = 'userinfo';
const userfile_table = 'fileinfo';
const file_location = 'public/uploads/';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
const jwtauth = require('./jwtauth.js');
const query = require('./sqlQuery.js');
const createJWT = require('./createJWT.js');

// --------------------------登陆用户验证----------------------
router.post('/user_login', async (req, res) => {
  console.log('==> 登陆用户验证');
  let {user_name, user_passwd} = req.body;
  let sql = `SELECT id,user_name,user_passwd from ${userinfo_table} WHERE user_name='${user_name}' && user_passwd='${user_passwd}'`;
  try {
    let data = await query(sql);
    if (data.length === 1) {
      console.log('==> 登陆用户验证 success id:',data[0].id);
      let token = createJWT(data[0].id,user_name); //用户的id  results[0].id
      res.status(200).send(token);
    } else {
      console.log('==> 登陆用户验证 failed');
      res.status(200).send({
        status: 1,
        mesg: '用户名或密码错误',
      });
    }
  } catch(err) {
    console.log('==> 登陆用户验证 err');
    res.status(200).send({
      status: 2,
      mesg: '请求错误',
      err: err
    });
  }
});

// --------------------------注册用户----------------------
router.post('/user_register', async (req, res) => {
  console.log('==> 注册用户验证');
  let {user_name, user_passwd} = req.body;
  try {
    let sql_user = `SELECT user_name from ${userinfo_table} WHERE user_name='${user_name}'`;
    let res_user = await query(sql_user);
    if (res_user.length !== 0) {
      console.log('==> 注册用户验证 failed');
      res.status(200).send({
        status: 1,
        mesg: '用户已存在',
      });
      return;
    }
    let sql_table = `INSERT INTO ${userinfo_table} ( user_name, user_passwd, create_at, status, vip, location)
             VALUES ( '${user_name}', '${user_passwd}', ${Date.now()}, 0, 0, '${file_location}' )`;
    let res_table = await query(sql_table);
    let user_id = res_table.insertId;
    let sql_tableInit = `INSERT INTO ${userfile_table} (user_id,last_name,hash_name,type,pid,create_at,status)
             VALUES (${user_id},'云盘','${Date.now()}-云盘','dir',-1,${Date.now()},0)`;
    let res_tableInit = await query(sql_tableInit);
    let token = createJWT(user_id,user_name);
    console.log('==> 注册用户验证 success token id:',user_id);
    res.status(200).send(token);
    return;
  } catch(err) {
    console.log('==> 注册用户验证 err');
    res.status(200).send({
      status: 2,
      mesg: '请求错误',
      err: err
    });
    return;
  }
});
// --------------------------用户文件表获得---------------------
router.post('/get_user_file', jwtauth, async (req, res) => {  
  console.log('==> 请求用户数据表');
  let user_id = req.iss;
  let user_name = req.username;
  try {
    let sql_getfile = `SELECT hash_name, last_name, type, id, pid, size FROM ${userfile_table} WHERE user_id=${user_id} && status=0`;
    let res_getfile = await query(sql_getfile);
    console.log('==> 请求用户数据表 success id:',user_id);
    res.status(200).send({
      status: 0,
      mesg: '请求成功',
      name: user_name,
      data: res_getfile
    });
  } catch(err) {
    console.log('==> 请求用户数据表 failed');
    res.status(200).send({
      status: 2,
      mesg: '请求错误',
      err: err
    });
  }
});

// --------------------------文件上传---------------------
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let newdir = `${file_location}${req.iss}`;
    try{
      fs.accessSync(newdir); 
    }catch(e){
      fs.mkdirSync(newdir);
    }  
    cb(null, newdir)
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
});
const upload = multer({ storage: storage });

router.post('/uploads', [jwtauth, upload.single('file')], async (req, res) => {
  try {
    let {pid} = req.query;
    let user_id = req.iss;
    let {originalname,filename,size,mimetype} = req.file; 
    let sql_upload = `INSERT INTO ${userfile_table} (user_id,last_name,hash_name,type,pid,create_at,status)
             VALUES (${user_id},'${originalname}','${filename}','${mimetype}',${pid},${Date.now()},0)`;
    let res_upload = await query(sql_upload);
    let file_id =res_upload.insertId;
    res.status(200).send({
      status: 0,
      data: {
        file_id: file_id,
        last_name: originalname,
        type: mimetype,
        hash_name: filename
      }
    });
  } catch(err) {
    console.log('err',err);
    res.status(200).send({
      status: 2,
      mesg: '请求错误',
      err: err
    });
  }
});

module.exports = router;
