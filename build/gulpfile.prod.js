/**
 * Created by linfengluo@gmail.com on 2017/9/19.
 */

var gulp = require('gulp'),
    pngquant = require('imagemin-pngquant'),
    revCollector= require('gulp-rev-collector'),            //路径替换
    runSequence = require('run-sequence'),                  //执行队列
    cssver = require('gulp-make-css-url-version'),
    Config = require('./gulpfile.config.js');

var $ = require('gulp-load-plugins')();

//======= gulp build===============
function prod() {

    /**
     * assets文件夹下的所有文件处理
     * 直接移动到dist，不做处理
     */
    gulp.task('assets', function () {
        return gulp.src(Config.assets.src)
            .pipe($.plumber())
            .pipe(gulp.dest(Config.assets.dist));
    });

    /**
     * CSS样式处理
     */
    gulp.task('css', function () {
        return gulp.src(Config.css.src)
            .pipe($.plumber())
            .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
            .pipe($.cssnano()) //执行压缩
            .pipe($.rev())
            .pipe(gulp.dest(Config.css.dist))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(Config.manifest.src + 'css/'));
    });

    /**
     * SASS样式处理
     */
    gulp.task('sass', function () {
        return gulp.src(Config.sass.src)
            .pipe($.plumber())
            .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe($.sass())
            .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
            .pipe($.cssnano()) //执行压缩
            .pipe($.rev())
            .pipe(gulp.dest(Config.sass.dist))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(Config.manifest.src + 'sass/'));
    });

    /*
    * Less
    * */
    gulp.task('less', function () {
        return gulp.src(Config.less.src)
            .pipe($.plumber())
            .pipe($.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe($.less())
            .pipe(cssver()) //给css文件里引用文件加版本号（文件MD5）
            .pipe($.cssnano()) //执行压缩
            .pipe($.rev())
            .pipe(gulp.dest(Config.less.dist))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(Config.manifest.src + 'less/'));
    });

    /**
     * js处理
     */
    gulp.task('js', function () {
        return gulp.src(Config.js.src)
            .pipe($.plumber())
            .pipe($.babel({
                presets: ['es2015']
            }))
            // .pipe($.jshint('.jshintrc'))
            // .pipe($.jshint.reporter('default'))
            .pipe($.uglify())
            .pipe($.rev())
            .pipe(gulp.dest(Config.js.dist))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(Config.manifest.src + 'js/'));
    });

    /**
     * 合并所有js文件并做压缩处理
     */
    gulp.task('js-concat', function () {
        return gulp.src(Config.js.src)
            .pipe($.plumber())
            .pipe($.babel({
                presets: ['es2015']
            }))
            // .pipe($.jshint('.jshintrc'))             //JS检查
            // .pipe($.jshint.reporter('default'))
            .pipe($.concat(Config.js.build_name))
            .pipe($.uglify())
            .pipe($.rev())
            .pipe(gulp.dest(Config.js.dist))
            .pipe($.rev.manifest())
            .pipe(gulp.dest(Config.manifest.src + 'concat/'));
    });

    /**
     * 图片处理
     */
    gulp.task('images', function () {
        var options = {
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        };
        return gulp.src(Config.img.src)
            .pipe($.plumber())
            .pipe($.imagemin(options))
            .pipe(gulp.dest(Config.img.dist));
    });

    gulp.task('html', function() {
        var options = {
            removeComments: true,                           //清除HTML注释
            collapseWhitespace: true,                       //压缩HTML
            collapseBooleanAttributes: true,                //省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,                    //删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,               //删除<script>的type="text/javascript"
            removeStyleLinkTypeAttributes: true,            //删除<style>和<link>的type="text/css"
            minifyJS: true,                                 //压缩页面JS
            minifyCSS: true                                 //压缩页面CSS
        };
        return gulp.src([Config.manifest.dist, Config.html.src])
            .pipe($.plumber())
            .pipe(revCollector({
                replaceReved: true
            }))
            .pipe($.htmlmin(options))
            .pipe(gulp.dest(Config.html.dist));
    });


    gulp.task('build', function () {
        runSequence(['css', 'sass','less', 'js', 'assets', 'images'],
            'html'
        );
    });
}
module.exports = prod;