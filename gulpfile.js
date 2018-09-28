require('babel-polyfill');//es6转es5，为了支持ie10及以下
let gulp = require('gulp');// 引入 gulp
let jshint = require('gulp-jshint');// 引入检查文件组件
let uglify = require('gulp-uglify');//压缩js
let cleanCss = require('gulp-clean-css');//压缩css
let htmlmin = require('gulp-htmlmin');//压缩html
let clean = require('gulp-clean');//清空文件
let sequence = require('run-sequence');//运行队列
let fileInclude = require('gulp-file-include');//引入复用文件
let babel = require('gulp-babel');//es6转es5
let browserSync = require('browser-sync').create();//浏览器同步
//合并文件并删除合并前文件
let useref = require('gulp-useref');
let del = require('del');
let vinylPaths = require('vinyl-paths');
//let gulpif = require('gulp-if');
//版本控制
let rev = require('gulp-rev');
let revCollector = require('gulp-rev-collector');
let flatten = require("gulp-flatten");
// 定义变量
let destPath = './dist';
let revPath = './rev';
let bowerPath = './bower_components';
let npmPath = './node_modules';
let env = process.env.NODE_ENV === 'production';

// html文件
gulp.task('html', function () {
    let options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    // 网站根目录index文件，打开后会自动跳转到前台首页
    gulp.src(['rev/**/*.json','./src/index.html'])
        /*.pipe(useref(),function (){
            return vinylPaths(del)
        })*/
        .pipe(revCollector({
            replaceReved:true          //一定要加上这一句，不然不会替换掉上一次的值
        }))
        .pipe(gulp.dest(destPath));
    // src目录下的其他html文件
    return gulp.src(['rev/**/*.json','./src/pages/**/*.html', '!' + bowerPath + '/!**/!*'])
       /* .pipe(useref(),function (){
            return vinylPaths(del)
        })*/
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(revCollector({
            replaceReved:true          //一定要加上这一句，不然不会替换掉上一次的值
        }))
        .pipe(htmlmin(options))
        .pipe(gulp.dest(destPath + '/pages'));
});
// 图片文件
gulp.task('images', function () {
    return gulp.src(['./src/images/*'])
        .pipe(gulp.dest(destPath + '/images'));
});
// 清理目标文件夹
gulp.task('clean', function () {
    return gulp.src([destPath + '/',revPath + '/'], {read: false})
        .pipe(clean());
});

if(env){//生产环境
    // 页面使用的css文件
    gulp.task('css', function () {
        return gulp.src(['./src/css/*.css', '!' + bowerPath + '/**/*'])
            .pipe(cleanCss())
            .pipe(rev())
            .pipe(gulp.dest(destPath))
            .pipe(flatten({includeParents:[0,1]}))
            .pipe(rev.manifest())
            .pipe(gulp.dest(revPath + '/css'));
    });
    // 页面使用的js文件
    gulp.task('scripts', function () {
        return gulp.src(['./src/**/js/*.js', '!' + bowerPath + '/**/*'])
            .pipe(babel({
                presets: ['env'],
                compact:false
            }))
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest(destPath+'/js'))
            .pipe(flatten({includeParents:[0,1]}))
            .pipe(rev.manifest())
            .pipe(gulp.dest(revPath +'/js'));
    });
    gulp.task('utils', function () {
        return gulp.src(['./src/utils/*.js'])
            .pipe(babel({
                presets: ['env'],
                compact: false
            }))
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest(destPath + '/utils'))
            .pipe(flatten({includeParents: [0, 1]}))
            .pipe(rev.manifest())
            .pipe(gulp.dest(revPath + '/utils'));
    });
    //配置文件
    gulp.task('config', function () {
        return gulp.src(['./config/*.js'])
            .pipe(babel({
                presets: ['env'],
                compact: false
            }))
            .pipe(uglify())
            .pipe(rev())
            .pipe(gulp.dest(destPath + '/config'))
            .pipe(flatten({includeParents: [0, 1]}))
            .pipe(rev.manifest())
            .pipe(gulp.dest(revPath + '/config'));
    });
}else{//开发环境
    // 检查js文件
    gulp.task('lint', function () {
        gulp.src(['./config/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
        return gulp.src(['./src/js/**/*.js'])
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });
    // 页面使用的json文件
    gulp.task('json', function () {
        return gulp.src(['./src/jsonDatas/*.json', '!' + bowerPath + '/**/*'])
            .pipe(gulp.dest(destPath + '/jsonDatas'));
    });
    gulp.task('css', function () {
        return gulp.src(['./src/css/**/*.css', '!' + bowerPath + '/**/*'])
            .pipe(gulp.dest(destPath + '/css'));
    });
    // 页面使用的js文件
    gulp.task('scripts', function () {
        return gulp.src(['./src/js/**/*.js', '!' + bowerPath + '/**/*'])
            .pipe(babel({
                presets: ['env'],
                compact:false
            }))
            .pipe(gulp.dest(destPath+'/js'));
    });
    gulp.task('utils', function () {
        return gulp.src(['./src/utils/*.js'])
            .pipe(babel({
                presets: ['env'],
                compact:false
            }))
            .pipe(gulp.dest(destPath+ '/utils'));
    });
    //配置文件
    gulp.task('config', function () {
        return gulp.src(['./config/*.js'])
            .pipe(babel({
                presets: ['env'],
                compact: false
            }))
            .pipe(gulp.dest(destPath + '/config'));
    });
}

// ▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽▽
// 如果需要添加新的库或者框架，需要修改以下部分
// 复制使用bower引入的js库的文件，纯js库修改这里
gulp.task('copyJsLib', function () {
    //echarts
    gulp.src(bowerPath + '/echarts/map/js/china.js')
        .pipe(gulp.dest(destPath + '/lib/echarts'));
    gulp.src(bowerPath + '/echarts/dist/echarts.js')
        .pipe(gulp.dest(destPath + '/lib/echarts'));
    //jquery
    gulp.src(bowerPath + '/jquery/dist/jquery.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/js'));
    gulp.src(bowerPath + '/plupload/js/plupload.full.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/js'));
    gulp.src(bowerPath + '/plupload/js/moxie.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/js'));
    gulp.src(bowerPath + '/jquery.serializeJSON/jquery.serializejson.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/js'));
    //引入垫片
    return gulp.src(npmPath + '/babel-polyfill/dist/polyfill.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/js/'));
});
// 复制使用bower引入的组件库或样式框架的文件，带样式文件或其他文件的js框架改这里
gulp.task('copyUiLib', function () {
    gulp.src(bowerPath + '/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.css')
        .pipe(cleanCss())
        .pipe(gulp.dest(destPath + '/lib/bootstrap-table'));
    gulp.src(bowerPath + '/bootstrap-table-fixed-columns/bootstrap-table-fixed-columns.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/bootstrap-table'));
    // bootstrap-table
    gulp.src(bowerPath + '/bootstrap-table/dist/bootstrap-table.min.css')
        .pipe(cleanCss())
        .pipe(gulp.dest(destPath + '/lib/bootstrap-table'));
    gulp.src(bowerPath + '/bootstrap-table/dist/bootstrap-table.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/bootstrap-table'));
    gulp.src(bowerPath + '/bootstrap-table/dist/locale/bootstrap-table-zh-CN.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/bootstrap-table'));
    //fileinput
    gulp.src(bowerPath + '/fileinput/fileinput.css')
        .pipe(cleanCss())
        .pipe(gulp.dest(destPath + '/lib/fileinput'));
    gulp.src(bowerPath + '/fileinput/fileinput.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/fileinput'));
    // bootstrap
    gulp.src(bowerPath + '/bootstrap/dist/js/bootstrap.min.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/bootstrap/js'));
    gulp.src(bowerPath + '/bootstrap/dist/fonts/*')
        .pipe(gulp.dest(destPath + '/lib/bootstrap/fonts'));
    gulp.src(bowerPath + '/bootstrap/dist/css/bootstrap.css')
        .pipe(cleanCss())
        .pipe(gulp.dest(destPath + '/lib/bootstrap/css'))
    /*图标*/
    gulp.src(bowerPath + '/font-awesome/web-fonts-with-css/webfonts/*')
        .pipe(gulp.dest(destPath + '/lib/fontawesome/webfonts'));
    gulp.src(bowerPath + '/font-awesome/web-fonts-with-css/css/fontawesome-all.css')
        .pipe(cleanCss())
        .pipe(gulp.dest(destPath + '/lib/fontawesome/css'));
    gulp.src('./src/utils/ueditor/**/*')
        // .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/ueditor'));
    //laydate
    gulp.src(bowerPath + '/laydate/dist/laydate.js')
        .pipe(uglify())
        .pipe(gulp.dest(destPath + '/lib/layer'));
    gulp.src(bowerPath + '/laydate/dist/theme/default/laydate.css')
        .pipe(cleanCss())
        .pipe(gulp.dest(destPath + '/lib/layer/theme/default'));
    return gulp.src(bowerPath + '/laydate/dist/theme/default/font/*')
        .pipe(gulp.dest(destPath + '/lib/layer/theme/default/font'));
});
// △△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△△
if(env){
    // 默认任务
    gulp.task('default', function () {
        sequence(
            'clean',
            'lint',
            'copyJsLib',
            'copyUiLib',
            'images',
            'json',
            'css',
            'scripts',
            'utils',
            'config',
            'html'
        );
    });
}else{
    // 监听目标文件夹
    gulp.task('watch', function () {
        gulp.watch('./src/js/**/*.js', [ 'scripts','html']);
        gulp.watch('./src/utils/*.js', [ 'utils','html']);
        gulp.watch('./config/*.js', [ 'config','html']);
        gulp.watch('./src/css/**/*.css', ['css','html']);
        gulp.watch('./src/pages/**/*.html', ['html']);
        gulp.watch('./src/jsonDatas/**/*.json', ['json']);
    });
// 配置服务器
    gulp.task('server', function () {
        browserSync.init({
            server: {
                baseDir: destPath,
                index: './index.html'
            },
            port: 8898
        });
        // 监听 html
        gulp.watch([destPath + '/**/*']).on('change', browserSync.reload);
    });
// 默认任务
    gulp.task('default', function () {
        sequence(
            'clean',
            'lint',
            'copyJsLib',
            'copyUiLib',
            'images',
            'json',
            'css',
            'scripts',
            'utils',
            'config',
            'html',
            ['server', 'watch']
        );
    });
}
