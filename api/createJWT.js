/*
函数: 用于生成tokenid
参数: id: 用户唯一id; user_name: 用户姓名;
返回: {username: '', iss: user_id, exp: date}
时间: 2018.07.24 swallow
*/
const jwt = require('jwt-simple');
const moment = require('moment');
module.exports = function (id,user_name) {
  let expires = moment().add(7, 'days').valueOf();
  let token = jwt.encode({
    username: user_name,
    iss: id,
    exp: expires
  }, 'HS256');
  return {
    status: 0,
    mesg: 'token success',
    token : token,
    expires: expires
  }
};