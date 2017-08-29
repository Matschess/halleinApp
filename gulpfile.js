var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    concat = require('gulp-concat'),
    jsonminify = require('gulp-jsonminify');

// ---------- CONFIG ----------
var dest = {
    styles: 'www/public/css',
    scripts: 'www/public/js',
    content: 'www/content',
    assets: 'www/assets',
    languages: 'www/lang'
}
// ---------- [END] CONFIG ----------

gulp.task('styles', function () {
    return gulp.src('resources/private/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cssmin())
        .pipe(concat('style.css'))
        .pipe(gulp.dest(dest.styles));
})

gulp.task('scripts', function () {
    return gulp.src('resources/private/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest(dest.scripts));
});

gulp.task('content', function () {
    return gulp.src('resources/content/**/*.html')
        .pipe(gulp.dest(dest.content));
});

gulp.task('assets', function () {
    return gulp.src('resources/private/assets/**/*')
        .pipe(gulp.dest(dest.assets));
});

gulp.task('languages', function () {
    return gulp.src('resources/lang/*.json')
        .pipe(jsonminify())
        .pipe(gulp.dest(dest.languages));
});

gulp.task('watch', function () {
    gulp.watch(['resources/private/scss/*.scss'], ['styles'])
    gulp.watch(['resources/private/js/**/*.js'], ['scripts'])
    gulp.watch(['resources/content/**/*.html'], ['content'])
    gulp.watch(['resources/private/assets/**/*'], ['assets'])
    gulp.watch(['resources/lang/*.json'], ['languages'])
})

gulp.task('default', function () {
    gulp.start('styles', 'scripts', 'content', 'assets', 'languages', 'watch');
});