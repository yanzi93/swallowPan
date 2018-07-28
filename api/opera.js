/*
数据表userfile操作接口：
1. 增加数据 - 增加文件夹（不包括上传文件）
2. 删除数据 - 删除文件
3. 修改数据 - 重命名文件
           - 移动文件
创建: 2018.07.24 swallow
*/
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer  = require('multer');
const fs = require('fs');

const userinfo_table = 'userinfo';
const userfile_table = 'fileinfo';

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
const jwtauth = require('./jwtauth.js');
const query = require('./sqlQuery.js');
const createJWT = require('./createJWT.js');

// --------------------------用户表的增加文件夹---------------------
router.post('/adddir', jwtauth, async (req, res) => {
  let user_id = req.iss;
  let {method, last_name, pid, type} = req.body;
  try {
    let hash_name = `${Date.now()}-${last_name}`;
    let sql_add = `INSERT INTO ${userfile_table} (user_id,last_name,hash_name,type,pid,create_at,status)
             VALUES (${user_id},'${last_name}','${hash_name}','${type}',${pid},${Date.now()},0)`;
    let res_add = await query(sql_add);
    res.status(200).send({
      status: 0,
      mesg: '数据库成功',
      data: {
        file_id: res_add.insertId,
        hash_name: hash_name,
      }
    });
  } catch(err) {
    res.status(200).send({
      status: 2,
      mesg: '请求错误',
      err: err
    });
  }
});


// --------------------------用户表的删除文件---------------------
router.post('/remove', jwtauth, async (req, res) => {
  console.log('==> 删除用户文件');
  let user_id = req.iss;
  let {pid,delectIds} = req.body;
  delectIds = JSON.parse(delectIds);
  try { 
    let sql_remove = `UPDATE ${userfile_table} SET status=1 WHERE id in (${delectIds}) && pid = ${pid} && user_id=${user_id}`;
    let res_remove = await query(sql_remove);
    console.log('==> 删除用户文件 success')
    res.status(200).send({
      status: 0,
      mesg: '删除成功',
    });
  } catch(err) {
    console.log('==> 删除用户文件 err',err)
    res.status(200).send({
      status: 2,
      mesg: '请求错误',
      err: err
    });
  }
});

// --------------------------用户表的重命名文件---------------------
router.post('/rename', jwtauth, async (req, res) => {
  console.log('==> 重命名用户文件');
  let user_id = req.iss;
  let {id,last_name} = req.body;
  console.log(id,last_name);
  try { 
    let sql_rename = `UPDATE ${userfile_table} SET last_name='${last_name}' WHERE id=${id} && user_id=${user_id} && status=0`;
    let res_rename = await query(sql_rename);
    console.log(res_rename);
    console.log('==> 重命名用户文件 success');
    res.status(200).send({
      status: 0,
      mesg: '重命名成功',
    });
  } catch(err) {
    console.log('==> 重命名用户文件 err',err)
    res.status(200).send({
      status: 2,
      mesg: '请求错误',
      err: err
    });
  }
});


// --------------------------用户表的移动文件---------------------
router.post('/move', jwtauth, async (req, res) => {
  console.log('==> 移动用户文件');
  let user_id = req.iss;
  let {moveTargetId,selectedIds,selectedNames} = req.body;
  selectedIds = JSON.parse(selectedIds);
  selectedNames = JSON.parse(selectedNames);
  try { 
    // 缺少判断文件名重复
    let sql_move = `UPDATE ${userfile_table} SET pid=${moveTargetId} WHERE id in (${selectedIds}) && user_id=${user_id} && status=0`;
    console.log(sql_move);
    let res_move = await query(sql_move);
    for (let i=0; i<selectedNames.length; i++) {
      let sql_changename = `UPDATE ${userfile_table} SET last_name='${selectedNames[i].last_name}' WHERE id = ${selectedNames[i].id} && user_id=${user_id} && status=0`;
      let res_changename =  await query(sql_changename);
    }
    console.log('==> 移动用户文件 success')
    res.status(200).send({
      status: 0,
      mesg: '移动成功',
    });
  } catch(err) {
    console.log('==> 移动用户文件 err',err)
    res.status(200).send({
      status: 2,
      mesg: '请求错误',
      err: err
    });
  }
});



module.exports = router;
