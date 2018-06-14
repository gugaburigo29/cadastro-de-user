var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    minify = require('gulp-minify');

gulp.task('default', ['sass', 'js']);

gulp.task('sass', function () {
    return gulp.src('resources/sass/style.scss')
        .pipe(concat('style.min.css'))
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('public'));
});
gulp.task('js', function () {
    return gulp.src('resources/js/*.js')
        .pipe(concat('script.js'))
        .pipe(minify())
        .pipe(gulp.dest('public'));
});
gulp.task('watch', function () {
    gulp.watch('sass', ['sass']);
});