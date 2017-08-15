var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('default', function () {
    gulp.start('copy', 'css', 'scss', 'js');
});

gulp.task('copy', function () {
    return watch('private/assets/**/*', { ignoreInitial: false }, function() {
        gulp.src('private/assets/**/*')
            .pipe(gulp.dest('assets/'));
    })
});

gulp.task('css', function () {
    return watch('private/css/*', { ignoreInitial: false }, function() {
        gulp.src('private/css/*')
            .pipe(gulp.dest('public/css'));
    })
});

gulp.task('scss', function () {
    return watch('private/scss/*.scss', { ignoreInitial: false }, function() {
        gulp.src('private/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest('public/css'));
    });
});

gulp.task('js', function () {
    return watch('private/js/**/*', { ignoreInitial: false }, function() {
        gulp.src(['private/js/angular/routing.js', 'private/js/angular/controller/**/*', 'private/js/app.js'])
            .pipe(concat('app.js'))
            .pipe(gulp.dest('public/js'));
    });
});