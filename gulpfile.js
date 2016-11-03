const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('build', () => {
  gulp.src('src/**/*.js').
    pipe(babel()).
    pipe(gulp.dest('dist'));
});

gulp.task('default', ['build'], () => {
  // 将你的默认的任务代码放在这
});
