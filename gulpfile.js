const gulp = require('gulp');
nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT: 8000,
            NODE_ENV: 'test'
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting...');
    })
});