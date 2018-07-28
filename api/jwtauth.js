/*
函数: 用于解析token的中间件
参数: req, res, next
返回: 返回对象
      成功：中间件通过，继续向下执行
      失败：直接向浏览器返回失败状态 status=1/3
创建: 2018.07.24 swallow
*/
const jwt = require('jwt-simple');
module.exports = function(req, res, next) {
  let token = req.headers['x-access-token'];
  if (token) {
    try {
      let decoded = jwt.decode(token, 'HS256');
      if (decoded.exp <= Date.now()) {
        res.send({
          status: 1,
          mesg: 'token已过期',
        });
      } else {
        // 解析成功，得到id进行数据表获取
        console.log('success token')
        req.iss = decoded.iss;
        req.username = decoded.username;
        console.log('token', req.iss,req.username)
        next();
      }
     } catch (err) {
      //token解析失败
      res.status(200).send({
        status: 3,
        mesg: 'token解析失败',
        err: err
      });
    }
  } else {
    res.status(200).send({
      status: 1,
      mesg: 'token不存在',
    });
  }
};
