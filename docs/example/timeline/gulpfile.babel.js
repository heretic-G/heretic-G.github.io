import gulp from 'gulp'
import babel from 'gulp-babel'
import plumber from 'gulp-plumber'
import autoprefixer from 'gulp-autoprefixer'
import jsmin from 'gulp-uglify'
import watch from 'gulp-watch'


gulp.task('default', ['scripts', 'css', 'watch'])
gulp.task('build', ['scripts', 'css'])

gulp.task('scripts' , ()=>{
  return gulp.src('src/*.js')
    .pipe(plumber())
    .pipe(babel())    //靠这个插件编译
    .pipe(jsmin())
    .pipe(gulp.dest('dist/'));
});
gulp.task('css' , ()=>{
  return gulp.src('src/*.css')
    .pipe(plumber())
    .pipe(autoprefixer({browsers:['> 1%', 'last 2 versions', 'Firefox ESR']}))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', function () {
  gulp.watch('src/*.css',['css']);
  gulp.watch('src/*.js',['scripts']);
});
