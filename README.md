# gulp-template

> 基于gulp的前端工作流

# Quickstart

### 克隆代码 
> git clone https://github.com/linfengluo/gulp-template.git

### 开发
> npm run dev   

### 打包
> npm run build

# 目录
|- project \
　|- build\
　|- dist // 打包文件夹 \
　|- src  // 源文件夹 \
　|　|- assets // 放置一些第三方文件，如bootstrap \
　|　|- css \
　|　|- images \
　|　|- js \
　|　|- sass \
　|　|- less \
　-index.html\
　-gulpfile.js \
　- package.json 

# support

该工作流支持 Less 、Sass 、ES6 、 hot-load
    
* css
    * autoprefixer （自动补全）
    * MD5 （重命名）
    * cssnano （压缩）

* js
    * babel （ES6）
    * jshint （代码检查）
    * uglify （压缩）
    * MD5 （重命名）
    * concat （合并）

* image
    * imagemin （压缩）

* html
    * htmlmin （压缩）
    * revCollector （文件替换）



