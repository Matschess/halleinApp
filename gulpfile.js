var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var srcDir = 'resources/';
var directory = 'www/';

gulp.task('default', function () {
    gulp.start('html', 'content', 'lang', 'copy', 'css', 'scss', 'js');
});

gulp.task('html', function () {
    return watch(srcDir + 'index.html', { ignoreInitial: false }, function() {
        gulp.src(srcDir + 'index.html')
            .pipe(gulp.dest(directory));
    })
});

gulp.task('content', function () {
    return watch(srcDir + 'content/', { ignoreInitial: false }, function() {
        gulp.src(srcDir + 'content/**/*')
            .pipe(gulp.dest(directory + 'content/'));
    })
});

gulp.task('lang', function () {
    return watch(srcDir + 'lang/', { ignoreInitial: false }, function() {
        gulp.src(srcDir + 'lang/**/*')
            .pipe(gulp.dest(directory + 'lang/'));
    })
});

gulp.task('copy', function () {
    return watch(srcDir + 'private/assets/**/*', { ignoreInitial: false }, function() {
        gulp.src(srcDir + 'private/assets/**/*')
            .pipe(gulp.dest(directory + 'assets/'));
    })
});

gulp.task('css', function () {
    return watch(srcDir + 'private/css/*', { ignoreInitial: false }, function() {
        gulp.src(srcDir + 'private/css/*')
            .pipe(gulp.dest(directory + 'public/css'));
    })
});

gulp.task('scss', function () {
    return watch(srcDir + 'private/scss/*.scss', { ignoreInitial: false }, function() {
        gulp.src(srcDir + 'private/scss/*.scss')
            .pipe(sass())
            .pipe(gulp.dest(directory + 'public/css'));
    });
});

gulp.task('js', function () {
    return watch(srcDir + 'private/js/**/*', { ignoreInitial: false }, function() {
        gulp.src([srcDir + 'private/js/angular/routing.js', srcDir + 'private/js/angular/controller/**/*', srcDir + 'private/js/app.js'])
            .pipe(concat('app.js'))
            .pipe(gulp.dest(directory + 'public/js'));
    });
});