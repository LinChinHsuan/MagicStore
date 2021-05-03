var gulp = require('gulp');
const $ = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var minimist = require('minimist');

//宣告環境選項
var envOptions = {
    string: 'env',
    default: { env: 'develop'}
}
var options = minimist(process.argv.slice(2), envOptions);
console.log(options);

gulp.task('sass', function () {
    return gulp.src('./sass/**/*.scss')
      .pipe($.sass().on('error', $.sass.logError))
      .pipe($.postcss([autoprefixer()]))
      .pipe($.if(options.env === production, $.cleanCss({compatibility: 'ie8'})))
      .pipe($.sourcemaps.write('.'))
      .pipe(gulp.dest('./css'));
});

//for public
// gulp.task('clean', function () {
//     return gulp.src(['./public'], {read: false, allowEmpty:true})
//         .pipe($.clean());
// });

// gulp.task('copyHtml', function () {
//     return gulp.src('./*.html')
//         .pipe(gulp.dest('./public'));
// });