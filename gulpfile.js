/**
** @run echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
**/
var gulp        = require('gulp'),
    usemin      = require('gulp-usemin'),
    wrap        = require('gulp-wrap'),
    connect     = require('gulp-connect'),
    watch       = require('gulp-watch'),
    minifyCss   = require('gulp-cssnano'),
    minifyJs    = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    less        = require('gulp-less'),
    rename      = require('gulp-rename'),
    minifyHTML  = require('gulp-htmlmin'),
    copy        = require('gulp-copy'),
    replace     = require('gulp-replace-task')
    zip         = require('gulp-zip');

var args    = require('yargs').argv,
    fs      = require('fs');

var paths = {
    scripts:    'src/js/**/*.*',
    styles:     'src/less/**/*.*',
    appStyles : 'src/css/**/*.*',
    images:     'src/img/**/*.*',
    templates:  'src/templates/**/*.html',
    index:      'src/index.html',
    bower_fonts: 'src/components/**/*.{ttf,woff,eof,svg}',
    deploy: {
        scripts:    'tmp/js/**/*.*',
        styles:     'tmp/less/**/*.*',
        appStyles : 'tmp/css/**/*.*',
        images:     'tmp/img/**/*.*',
        templates:  'tmp/templates/**/*.html',
        index:      'tmp/index.html',
        bower_fonts: 'tmp/components/**/*.{ttf,woff,eof,svg}'
    }
};

/**
** Build Temporary directory
**/
gulp.task('tmp', function () {

    return gulp
            .src(['src/**/*'], { base: 'src' })
            .pipe(gulp.dest('tmp/'));
});

/**
** Search and replace URLs in order to set up the enviroment
**      Development or Production
**      Copies DATA directory for fake JSON
**/
gulp.task('env', ['tmp'], function () {

    var env = args.env || 'development'; // Get option from the command line. Development é default
    
    // Get the file with the env variables
    var filename = env + '.json';
    var settings = JSON.parse(fs.readFileSync('./config/' + filename, 'utf8'));

    return gulp
            .src('./tmp/js/app/app.constants.js')
            .pipe(replace({
                    patterns: [{
                        match: 'apiUrl',
                        replacement: settings.apiUrl
                    }]
            }))
            .pipe(gulp.dest('./tmp/js/app')); // Gives it back to the Dist Directory
});

/**
 * Handle bower components from index
 */
gulp.task('dist', ['env'], function() {
    return gulp
        .src(paths.deploy.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
** Build Dashboard
**/
gulp.task('dashboard', ['dist'], function() {
    return gulp.src(paths.deploy.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
});

/**
** Creates Jenkins artefact
**/
gulp.task('artifact', function() {
    return gulp.src('dist/**/*', { base: 'dist' })
        .pipe(zip('dashboard.zip'))
        .pipe(gulp.dest('dist'))
});

/**
 * Handle bower components from index
 */
gulp.task('usemin', function() {
    return gulp
        .src(paths.index)
        .pipe(usemin({
            js: [minifyJs(), 'concat'],
            css: [minifyCss({keepSpecialComments: 0}), 'concat'],
        }))
        .pipe(gulp.dest('dist/'));
});

/**
    * Copies DATA directory for fake JSON
**/
gulp.task('copy', function () {
    return gulp
            .src(['src/data/**/*', 'src/vendor/**/*'], { base: 'src' })
            .pipe(gulp.dest('dist/'));
});

/**
 * Copy assets
 */
gulp.task('build-assets', ['copy-bower_fonts']);

gulp.task('copy-bower_fonts', function() {
    return gulp.src(paths.bower_fonts)
        .pipe(rename({
            dirname: '/fonts'
        }))
        .pipe(gulp.dest('dist/lib'));
});

/**
 * Handle custom files
 */
gulp.task('build-custom', ['custom-images', 'custom-js', 'custom-less', 'custom-templates']);

gulp.task('custom-images', function() {
    return gulp.src(paths.images)
        .pipe(gulp.dest('dist/img'));
});

gulp.task('custom-js', function() {
    return gulp.src(paths.scripts)
        .pipe(minifyJs())
        .pipe(concat('dashboard.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('custom-less', function() {
    return gulp.src(paths.styles)
        .pipe(less())
        .pipe(gulp.dest('dist/css'));
});

gulp.task('custom-templates', function() {
    return gulp.src(paths.templates)
        .pipe(minifyHTML())
        .pipe(gulp.dest('dist/templates'));
});

/**
 * Watch custom files
 */
gulp.task('watch', function() {
    gulp.watch([paths.images], ['custom-images']);
    gulp.watch([paths.styles], ['custom-less']);
    gulp.watch([paths.appStyles]);
    gulp.watch([paths.scripts], ['custom-js', 'env-development']);
    gulp.watch([paths.templates], ['custom-templates']);
    gulp.watch([paths.index], ['usemin']);
});

/**
 * Live reload server
 */
gulp.task('webserver', function() {
    connect.server({
        root: 'dist',
        livereload: true,
        port: 8888
    });
});

gulp.task('livereload', function() {
    gulp.src(['dist/**/*.*'])
        .pipe(watch(['dist/**/*.*']))
        .pipe(connect.reload());
});

/**
** Change to Development set up
**/
gulp.task('env-development', ['custom-js'], function () {

    var env = 'development'; // Get option from the command line. Development é default
    
    // Get the file with the env variables
    var filename = env + '.json';
    var settings = JSON.parse(fs.readFileSync('./config/' + filename, 'utf8'));

    return gulp
            .src('./dist/js/dashboard.min.js')
            .pipe(replace({
                    patterns: [{
                        match: 'apiUrl',
                        replacement: settings.apiUrl
                    }]
            }))
            .pipe(gulp.dest('./dist/js')); // Gives it back to the Dist Directory
});

/**
 * Gulp tasks
 */
gulp.task('deploy', ['tmp', 'env', 'dist', 'dashboard', 'build-assets', 'custom-images', 'custom-less', 'custom-templates']);
gulp.task('build', ['usemin', 'copy', 'build-assets', 'build-custom']);
gulp.task('default', ['build', 'env-development', 'webserver', 'livereload', 'watch']);