const { series,parallel,src,dest } = require('gulp');
const useref = require('gulp-useref');
const gulpif = require('gulp-if');
const uglify = require('gulp-uglify-es').default;
const minifyCss = require('gulp-clean-css');
const deploy = require('gulp-gh-pages');

function clean(){
    return
}

function cssMinify(){
    return src('index.html')
    .pipe(useref())
    .pipe(gulpif('*.css', minifyCss()))
    .pipe(dest('dist'));
}
function jsMinify(){
    return src('index.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(dest('dist'));
}

function deployGitHub(){
    return src("dist/**/*")
      .pipe(deploy({ 
        remoteUrl: "https://github.com/eastecnologia/deploy-github.git",
        branch: "deploy"
      }))
}

exports.deploy = deployGitHub;

exports.build = jsMinify,cssMinify;

exports.default = series(cssMinify, parallel(cssMinify, jsMinify));