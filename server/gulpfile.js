const gulp = require('gulp')
const cssnano = require('gulp-cssnano')
const rev = require('gulp-rev');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const del = require('del');
const sass = require('gulp-sass') (require('node-sass'));

gulp.task( 'css' , function(done){
    console.log('Minifying css');
    gulp.src('./statics/sass/**/*.scss')
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest('./statics/css'))

    console.log('minified css');
    gulp.src( './statics/**/*.css' )
    .pipe(rev())
    .pipe(gulp.dest('./public/statics'))
    .pipe(rev.manifest( 'public/statics/rev-manifest.json' , {
        base : './public/statics',
        merge : true
    }))
    .pipe(gulp.dest('./public/statics'));
    done();

} ) 


gulp.task( 'js' ,function(done){
    console.log('minifying js.........');
    gulp.src('./statics/**/*.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('./public/statics'))
    .pipe(rev.manifest( 'public/statics/rev-manifest.json' , {
        base : './public/statics',
        merge : true
    }))
    .pipe(gulp.dest('./public/statics'));
    done();
}) 

gulp.task( 'images' , function(done){
    console.log('minifying images......');
    gulp.src('./statics/**/*.+(png|jpg|gif|svg|jpeg)')
    .pipe(imagemin())
    .pipe(rev())
    .pipe(gulp.dest('./public/statics'))
    .pipe(rev.manifest( 'public/statics/rev-manifest.json' , {
        base : './public/statics',
        merge : true
    }))
    .pipe(gulp.dest('./public/statics'));
    done();
} )


gulp.task('clean:statics' , function(done){
    del.sync(['./public/statics'] , {force:true});
    done();
} )


gulp.task( 'build' , gulp.series( 'clean:statics' , 'css' , 'js' , 'images' ) , function(done){
    console.log('building statics');
    done();
}  );