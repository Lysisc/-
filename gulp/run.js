var fs = require('fs'),
    argv = require('yargs').argv,
    os = require('os'),
    inject = require('gulp-inject');

var runType = argv.run || '', // dev、build
    packageType = argv.g || 'app';

module.exports = function (gulp, $) {

    gulp.task('tmpl', ['minjs'], function() {

        if (packageType == 'web') {
            gulp.start('connect');
        }
        
    });
    

    gulp.task('html', ['sass', 'connect', 'watch']);


    gulp.task('dev', ['sass', 'connect', 'watch']);

    
    gulp.task('build', ['replacehtml', 'templates', 'movecss', 'moveimages', 'movefonts', 'movejson'], function() {
        gulp.start('tmpl');
    });


    gulp.task('text', ['connect', 'word']);


    gulp.task('run', ['clean'], function () {

        switch (runType) {
            case 'html':
                gulp.start('html'); //---静态资源服务
            break;

            case 'build':
                gulp.start('build'); //--打包测试
            break;

            case 'word':
                gulp.start('text'); //---文档服务启动
            break;

            default:
                gulp.start('dev'); //----开发调试任务启动
        }

    });

};