# 模仿百度网盘

## 简介
模仿百度网盘。[项目展示地址](http://pan.loyous.com/)
可以自己注册用户名，或者使用用户名：yanzi12345 密码：yanzi12345登陆。

上传文件仅用于功能展示，由于空间有限会不定期删除。
前端小白，自己摸索慢慢写的，有不对的地方欢迎指正～～

### 涉及知识：
1. jq，ES6语法编写。
2. node.js的express搭建开发框架
3. JWT记录用户状态。
4. mysql管理用户基本信息和文件信息。

### 实现功能：
1. 会员注册登陆退出。
2. 百度云盘文件上传，批量移动，框选，重命名，新建文件等基本功能。

## 页面展示

### 登陆注册页面
![登陆页面](https://raw.githubusercontent.com/yanzi93/swallowPan/master/showimg/%E6%B3%A8%E5%86%8C%E9%A1%B5%E9%9D%A2.png)
![注册页面](https://raw.githubusercontent.com/yanzi93/swallowPan/master/showimg/%E7%99%BB%E9%99%86%E9%A1%B5%E9%9D%A2.png)

### 主页面
![主页面](https://github.com/yanzi93/swallowPan/blob/master/showimg/%E4%B8%BB%E9%A1%B5%E9%9D%A2.png?raw=true)

### 框选功能
![框选功能](https://github.com/yanzi93/swallowPan/blob/master/showimg/%E6%A1%86%E9%80%89.png?raw=true)

### 上传功能
![上传功能](https://github.com/yanzi93/swallowPan/blob/master/showimg/%E7%A7%BB%E5%8A%A8.png?raw=true)

## 源码
- 入口文件index.js
- 需要模块位于package.json
  - express
  - router
  - jwt-simple
  - moment
  - multer
  - mysql
- 前端展示页面位于视图views文件夹
- 页面样式css，逻辑js，字体，图片等资源位于public文件夹
- 后端逻辑位于api文件夹

## 个人遇到问题和处理思路
1. 多次向数据库发送验证请求，且多次请求存在依赖关系。

   避免回调函数层层嵌套使用了ES7中的async/await。
   
2. 存储用户状态

   使用JWT在本地存储用户id，位于http头部请求时发送，后端进行判断。
   
3. 文件名重复情况下自动生成累计文件名

   使用正则匹配。
   
4. 框选

   碰撞函数检测状态
   
