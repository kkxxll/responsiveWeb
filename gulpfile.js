var gulp        = require('gulp')
var rev         = require('gulp-rev')         //获取文件hash码
var revReplace  = require('gulp-rev-replace') //更新页面文件引用
var useref      = require('gulp-useref')      //通过注释写设置
var filter      = require('gulp-filter')      //水流筛选和恢复
var uglify      = require('gulp-uglify')      //压缩js代码
var csso        = require('gulp-csso')        //压缩css代码
var concat      = require('gulp-concat')
var clean       = require('gulp-clean');

gulp.task('clean', function() {
  gulp.src('dist')
  .pipe(clean());
});
gulp.task('default', function (){
    var jsFilter = filter('src/js/*.js', {restore: true});
    var cssFilter = filter('src/css/*.css', {restore: true});
    var revFilter = filter(['src/**/*', '!src/**/*.html'], {restore: true});
    gulp.src('src/**/*.html')
    .pipe(useref())
    .pipe(jsFilter)
    .pipe(uglify())
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(csso())
    .pipe(cssFilter.restore)
    .pipe(revFilter)
    .pipe(rev())
    .pipe(revFilter.restore)
    .pipe(revReplace())
    .pipe(gulp.dest('dist'));
})
