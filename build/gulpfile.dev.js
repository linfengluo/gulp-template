/**
 * Created by linfengluo@gmail.com on 2017/9/19.
 */

var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    Config = require('./gulpfile.config.js'),
    pngquant = require('imagemin-pngquant');

var $ = require('gulp-load-plugins')();

//======= gulp dev===============
function dev() {

    /**
     * HTML处理
     */
    gulp.task('html:dev', function () {
        return gulp.src(Config.html.src)
            .pipe($.plumber())
            .pipe(gulp.dest(Config.html.dist))
            .pipe(reload({
                stream: true
            }));
    });

    /**
     * assets文件夹下的所有文件处理
     */
    gulp.task('assets:dev', function () {
        return gulp.src(Config.assets.src)
            .pipe($.plumber())
            .pipe(gulp.dest(Config.assets.dist))
            .pipe(reload({
                stream: true
            }));
    });

    /**
     * CSS样式处理
     */
    gulp.task('css:dev', function () {
        return gulp.src(Config.css.src)
            .pipe($.plumber())
            .pipe(gulp.dest(Config.css.dist))
            .pipe(reload({
                stream: true
            }));
    });

    /**
     * SASS样式处理
     */
    gulp.task('sass:dev', function () {
        return gulp.src(Config.sass.src)
            .pipe($.plumber())
            .pipe($.sass())
            .pipe(gulp.dest(Config.sass.dist))
            .pipe(reload({
                stream: true
            }));
    });

    /**
     * LESS样式处理
     */
    gulp.task('less:dev', function () {
        return gulp.src(Config.less.src)
            .pipe($.plumber())
            .pipe($.less())
            .pipe(gulp.dest(Config.less.dist))
            .pipe(reload({
                stream: true
            }));
    });

    /**
     * js处理
     */
    gulp.task('js:dev', function () {
        return gulp.src(Config.js.src)
            .pipe($.plumber())
            .pipe($.babel({
                presets: ['es2015']
            }))
            // .pipe($.jshint('.jshintrc'))              //JS检查
            // .pipe($.jshint.reporter('default'))
            .pipe(gulp.dest(Config.js.dist))
            .pipe(reload({
                stream: true
            }));
    });

    /**
     * 图片处理
     */
    gulp.task('images:dev', function () {
        var options = {
            optimizationLevel: 5,
            progressive: true,
            interlaced: true,
            use: [pngquant()]
        };
        return gulp.src(Config.img.src)
            .pipe($.plumber())
            .pipe($.imagemin(options))
            .pipe(gulp.dest(Config.img.dist))
            .pipe(reload({
                stream: true
            }));
    });

    //watch 热更新
    gulp.task('dev', ['html:dev', 'css:dev', 'sass:dev', 'js:dev', 'assets:dev', 'images:dev'], function () {
        browserSync.init({
            server: {
                baseDir: Config.dist
            }
            , notify: false
        });
        gulp.watch(Config.html.src, ['html:dev']);
        gulp.watch(Config.css.src, ['css:dev']);
        gulp.watch(Config.sass.src, ['sass:dev']);
        gulp.watch(Config.less.src, ['less:dev']);
        gulp.watch(Config.assets.src, ['assets:dev']);
        gulp.watch(Config.js.src, ['js:dev']);
        gulp.watch(Config.img.src, ['images:dev']);
    });
}

//======= gulp dev ==============
module.exports = dev;