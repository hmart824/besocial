const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const del = require('del');

gulp.task('css' , (done)=>{
    console.log('minifying css..............');
    gulp.src('./statics/scss/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./statics.css'));

    return gulp.src('./statics/**/*.css')
            .pipe(rev())
            .pipe(gulp.dest('./public/statics'))
            .pipe(rev.manifest({
                cwd: 'public',
                merge: true
            }))
            .pipe(gulp.dest('./public/statics'));

            done();
});


gulp.task('js' , (done)=>{
    console.log('minfying js.......');
    gulp.src('./statics/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/statics'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/statics'));
    done();
});


gulp.task('images' , (done)=>{
    console.log('minifying images....');
    gulp.src('./statics/images/*.+(png|jpg|gif|sgv|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/statics/images'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/statics/images'))
    done();
});

//*empty the public/statics directory
gulp.task('clean:statics' , (done)=>{
    del.sync('./public/statics');
    done();
});

gulp.task('build' , gulp.series('clean:statics' , 'images' , 'css' , 'js') , (done)=>{
    console.log('building statics');
    done();
});