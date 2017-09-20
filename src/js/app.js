/**
 * Created by linfengluo@gmail.com on 2017/9/20.
 */

document.onload = (function () {

    let md_content = `
# gulp-template \n

> 基于gulp的前端工作流


# support  \n

该工作流支持 Less 、Sass 、ES6 、 hot-load  \n
    
* css  \n
    * autoprefixer （自动补全）  \n
    * MD5 （重命名）  \n
    * cssnano （压缩）  \n

* js  \n
    * babel （ES6）  \n
    * jshint （代码检查）  \n
    * uglify （压缩）  \n
    * MD5 （重命名）  \n
    * concat （合并）  \n

* image  \n
    * imagemin （压缩）  \n

* html  \n
    * htmlmin （压缩）  \n
    * revCollector （文件替换）  \n

# Quickstart  \n

### 克隆代码   \n
> git clone https://github.com/linfengluo/gulp-template.git  \n

### 开发  \n
> npm run dev     \n

### 打包  \n
> npm run build  \n


# 目录
|- project \  \n
　|- build\
　|- dist // 打包文件夹 \  \n
　|- src  // 源文件夹 \      \n
　|　|- assets // 放置第三方文件 \   \n
　|　|- css \      \n
　|　|- images \      \n
　|　|- js \      \n
　|　|- sass \      \n
　|　|- less \      \n
　-index.html\      \n
　-.jshintrc\      \n
　-gulpfile.js \      \n
　- package.json       \n
`
    let html_content = markdown.toHTML( md_content );

    document.getElementById('markdown').innerHTML = html_content;

})();

