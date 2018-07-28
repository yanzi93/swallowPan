const express = require('express');
const multer = require('multer');
const fs = require('fs');
const jwt = require('jwt-simple');
// const router = require('router');
const userinfo_table = 'userinfo';
const userfile_table = 'fileinfo';


const app = express();

app.use(express.static('public'));

app.get('/', async (req, res) => {
	res.set('Content-Type', 'text/html');
	res.status(200).sendFile(__dirname + '/views/index.html');
});

// 注册
app.get('/login', (req, res) => {
	res.set('Content-Type', 'text/html');
	res.status(200).sendFile(__dirname + '/views/login.html');
});

app.use('/api', require('./api/api.js'));
app.use('/opera', require('./api/opera.js'));

app.get('*', (req,res) => {
	res.set('Content-Type', 'text/html;charset=utf-8');
	res.status(404).send(404);
})

app.listen(4400, ()=>{
	console.log('server success');
})
