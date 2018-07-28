/*
函数: 将数据库连接函数转换为promise类型，便于使用asyn／await
参数: sql:数据库操作语句
      values:
返回: 返回连接数据库promise对象
创建: 2018.07.24 swallow
*/
// 注意：请设置自己的数据库信息
const mysql = require('mysql');
let pool = mysql.createPool({
  host     : '',
  user     : '',
  password : '',
  database : ''
});
let query = function( sql, values ) {
  // 返回一个 Promise
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, ( err, results) => {
          if ( err ) {
            reject(err)
          } else {
            resolve(results)
          }
          connection.release(); // 结束会话
        })
      }
    })
  })
}
module.exports = query;
