# 模仿百度网盘

## 简介

模仿百度网盘。 [项目展示地址](http://pan.loyous.com/)
用户名：yanzi123456
密码：yanzi123456

数据库需自己设置后才可正常运行。

前端小白，自己摸索慢慢写的，有不对的地方欢迎指正～～

### 涉及知识：

- node.js、express 框架、jQuery、MySQL、JWT 等等 

### 功能

- 用户的基本管理，包括用户的登陆、注册、展示用户基本信息等等; 
- 以用户的维度按照树形结构展示网盘的信息，并实现了基本网盘的功能，如:上传、下载、新建文件、 文件的批量操作; 

### 难点

- 多次异步请求数据库回调嵌套(使用 async/await 解决) 

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
