const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const replace = require('gulp-replace');

// Static server
gulp.task('serve', function(){
    // Watch for all files change and reload
    gulp.watch('**').on('change', () => {
        browserSync.reload();
    });


    browserSync.init({
        // serve files from root directory
        server: ["./", "./examples"]
    });
});

// build
gulp.task('dist', () => {
    return gulp.src([
        'examples/**/*.*',
        'src/**/*.*',
    ])
        .pipe(gulp.dest('dist'));
});
gulp.task('replace', function(){
    // replace and overwrite
    return gulp.src(['dist/**/*.html'])
        .pipe(replace('../../src/', '../'))
        .pipe(replace('../src/', ''))
        .pipe(gulp.dest(function(file){
            console.log(file.base)
            return file.base;
        }, {overwrite: true}));
});
gulp.task('build', gulp.series('dist', 'replace'));