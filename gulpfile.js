var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass');

gulp.task('default', ['sass']);

gulp.task('sass', function () {
    return gulp.src('sass/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public'));
});
gulp.task('watch', function () {
    gulp.watch('sass', ['sass']);
});