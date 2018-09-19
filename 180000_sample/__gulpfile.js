const gulp = require('gulp');
const header = require('gulp-header');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const autoPrefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const promoConfig = require('./project.config');

const useWebpack = promoConfig.options.webpack;
const useUglify = promoConfig.options.uglifyJs;

const autoprefixer_browsers = ['last 4 version', 'not IE 8'];
const projectName = promoConfig.name;

const Path = {
    local: `${__dirname}`,
    local_src_sass: `${__dirname}/src/sass`,
    local_src_js: `${__dirname}/src/js`,
    local_src_img: `${__dirname}/src/img`,
    local_css: `${__dirname}/dist/css`,
    local_js: `${__dirname}/dist/js`,
    local_img: `${__dirname}/dist/img`
};

const sassList = ((sass = promoConfig.entry.sass) =>{
    if(!sass){
        return;
    }

    if(sass === '*'){
        return `${Path.local_src_sass}/**/*.scss`;
    }

    if(typeof sass === 'string'){
        return [`${Path.local_src_sass}/${sass}`, `${Path.local_src_sass}/module/**/*`, `${Path.local_src_sass}/base/**/*`,`${Path.local_src_sass}/mixin/**/*`];
    }

    if(Array.isArray(sass)){
        let list = [];

        sass.forEach((file) =>{
            list.push(`${Path.local_src_sass}/${file}`);
        });

        list.push(`${Path.local_src_sass}/base/**/*`);
        list.push(`${Path.local_src_sass}/mixin/**/*`);
        list.push(`${Path.local_src_sass}/module/**/*`);

        return list;
    }
})();

const jsList = ((js = promoConfig.entry.js) =>{
    if(!js){
        return;
    }

    let list = [];

    if(js === '*'){
        return `${Path.local_src_js}/**/*.js`;
    }

    if(typeof js === 'string'){
        return `${Path.local_src_js}/${js}`;
    }

    js.forEach((file) =>{
        list.push(`${Path.local_src_js}/${file}`);
    });

    return list;
})();

const banner = () =>{
    let date = new Date();
    return [
        '/**',
        ` * @project: ${projectName}`,
        ` * @author: msminsu`,
        ' * @update : ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(),
        ' */', ''
    ].join('\n');
};

let compileJs = () =>{
    if(useWebpack){
        gulp.src(jsList)
            .pipe(webpack(require('./webpack.config.js')))
            .pipe(gulp.dest(Path.local_js))
    } else {
        if(useUglify){
            gulp.src(jsList)
                .pipe(sourcemaps.init())
                .pipe(uglify({comments: false}))
                .pipe(header(banner()))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(Path.local_js))
        } else {
            gulp.src(jsList)
                .pipe(sourcemaps.init())
                .pipe(header(banner()))
                .pipe(sourcemaps.write('.'))
                .pipe(gulp.dest(Path.local_js))
        }
    }
};

let compileSass = () =>{
    gulp.src(sassList)
        .pipe(sourcemaps.init())
        .pipe(header(banner()))
        .pipe(sass({outputStyle: promoConfig.options.sassOutputStyle}).on('error', sass.logError))
        .pipe(autoPrefixer(autoprefixer_browsers))
        .pipe(sourcemaps.write(`.`))
        .pipe(gulp.dest(Path.local_css))
};

let log = () =>{
    watch(`${Path.local}/src/**/*`, (e) =>{
        console.log(`${e.event}: ${e.path.split('/').pop()}`);
    });
};

gulp.task('dev', () =>{
    if(promoConfig.entry.js){
        watch(jsList, compileJs);
        compileJs();

    }

    if(promoConfig.entry.sass){
        watch(sassList, compileSass);
        compileSass();
    }

    gulp.src(`${Path.local_src_img}/**/*`)
        .pipe(gulp.dest(Path.local_img));

    log();
});
