let buildFolder = "build";
let srcFolder = "#src";

// let fs = require('fs');

let path = {
   build: {
      html: buildFolder + "/",
      css: buildFolder + "/css/",
      js: buildFolder + "/js/",
      img: buildFolder + "/img/",
      fonts: buildFolder + "/fonts/",
   },
   src: {
      html: [srcFolder + "/*.html", "!" + srcFolder + "/_*.html"],
      css: [srcFolder + "/scss/style.scss"],
      js: srcFolder + "/js/*.js",
      img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,wepb}",
      fonts: srcFolder + "/fonts/*.ttf",
   },
   watch: {
      html: srcFolder + "/**/*.html",
      css: srcFolder + "/scss/**/*.scss",
      js: srcFolder + "/js/**/*.js",
      img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,wepb}"
   },
   clean: "./" + buildFolder + "/"
}

const { series, parallel, src, dest, watch, lastRun } = require('gulp'),
   gulp = require('gulp'),
   plumber = require('gulp-plumber'),
   fileinclude = require('gulp-file-include'),
   browsersync = require("browser-sync").create(),
   include = require('gulp-file-include'),
   del = require('del'),
   sass = require("gulp-sass"),
   autoprefixer = require("gulp-autoprefixer"),
   group_media = require("gulp-group-css-media-queries"),
   clean_css = require("gulp-clean-css"),
   rename = require("gulp-rename"),
   uglify = require("gulp-uglify-es").default,
   imagemin = require("gulp-imagemin"),
   webp = require('gulp-webp'),
   svgstore = require('gulp-svgstore'),
   ttf2woff = require('gulp-ttf2woff'),
   ttf2woff2 = require('gulp-ttf2woff2'),
   htmlbeautify = require('gulp-html-beautify'),
   fonter = require('gulp-fonter');

const html = () => {
   return src(path.src.html)
      .pipe(fileinclude())
      .pipe(htmlbeautify({
         'indent_size': 2,
         'preserve_newlines': true,
         'max_preserve_newlines': 0,
         'wrap_attributes': 'auto',
      }))
      .pipe(dest(path.build.html))
};
exports.html = html;

const css = () => {
   return src(path.src.css)
      .pipe(plumber())
      .pipe(sass({ outputStyle: "expanded" }))
      .pipe(group_media())
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 5 versions'],
         cascade: true,
         grid: true,
      }))
      .pipe(dest(path.build.css))
      .pipe(clean_css())
      .pipe(rename({ extname: ".min.css" }))
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
};
exports.css = css;

function js() {
   return src(path.src.js)
      .pipe(fileinclude())
      .pipe(dest(path.build.js))
      .pipe(
         uglify()
      )
      .pipe(
         rename({
            extname: ".min.js"
         })
      )
      .pipe(dest(path.build.js))
      .pipe(browsersync.stream())
};
exports.js = js;

const svgo = () => {
   return gulp.src(srcFolder + '/img/**/*.{svg}')
      .pipe(imagemin([
         imagemin.svgo({
            plugins: [
               { removeViewBox: false },
               { removeRasterImages: true },
               { removeUselessStrokeAndFill: false },
            ]
         }),
      ]))
      .pipe(gulp.dest(srcFolder + '/img'));
};
exports.svgo = svgo;

const sprite = () => {
   return gulp.src(srcFolder + '/img/sprite/*.svg')
      .pipe(svgstore({ inlineSvg: true }))
      .pipe(rename('sprite_auto.svg'))
      .pipe(gulp.dest(buildFolder + '/img'));
};
exports.sprite = sprite;

const syncserver = () => {
   browsersync.init({
      server: { baseDir: "./" + buildFolder + "/" },
      port: 3000,
      notify: false,
      open: true,
      cors: true,
      ui: false,
   });

   gulp.watch(path.watch.html, series(html, refresh));
   gulp.watch([path.watch.css, srcFolder + "/components/**/*.scss"], series(css, refresh));
   gulp.watch(path.watch.js, series(js, refresh));
   gulp.watch(srcFolder + '/img/**/*.svg', series(copysvg, sprite, html, refresh));
   gulp.watch(srcFolder + '/img/**/*.{png,jpg}', series(copypngjpg, html, refresh));

   gulp.watch(srcFolder + '/favicon/**', gulp.series(copy, refresh));
};

const refresh = (done) => {
   browsersync.reload();
   done();
};

const copysvg = () => {
   return gulp.src(srcFolder + '/img/**/*.svg', { base: srcFolder })
      .pipe(gulp.dest(buildFolder));
};

const copypngjpg = () => {
   return gulp.src(srcFolder + '/img/**/*.{png,jpg}', { base: srcFolder })
      .pipe(gulp.dest(buildFolder));
};

const copy = () => {
   return gulp.src([
      srcFolder + '/fonts/**',
      srcFolder + '/img/**',
      // srcFolder + '/data/**',
      srcFolder + '/favicon/**',
      // srcFolder + '/video/**',
      // srcFolder + '/downloads/**',
      // srcFolder + '/*.php',
   ], {
      base: srcFolder,
   })
      .pipe(gulp.dest(buildFolder));
};

const clean = () => {
   return del(path.clean);
};
exports.clean = clean;

const build = series(clean, svgo, parallel(js, css, html, copy, sprite));
const start = series(build, syncserver);

// Optional tasks
//---------------------------------

// Использовать отличное от дефолтного значение root, если нужно обработать отдельную папку в img,
// а не все изображения в img во всех папках.

// root = `` - по дефолту webp добавляются и обналяются во всех папках в source/img/
// root = `content/` - webp добавляются и обновляются только в source/img/content/

const createWebp = () => {
   const root = ``;
   return gulp.src(srcFolder + `/img/${root}**/*.{png,jpg}`)
     .pipe(webp({quality: 90}))
     .pipe(gulp.dest(srcFolder + `/img/${root}`));
 };
 
 const optimizeImages = () => {
   return gulp.src(buildFolder + '/img/**/*.{png,jpg}')
       .pipe(imagemin([
         imagemin.optipng({optimizationLevel: 3}),
         imagemin.mozjpeg({quality: 75, progressive: true}),
       ]))
       .pipe(gulp.dest(buildFolder + '/img'));
 };
exports.build = build;
exports.start = start;
exports.webp = createWebp;
exports.imagemin = optimizeImages;

function fonts() {
   src(path.src.fonts)
      .pipe(ttf2woff())
      .pipe(dest(path.build.fonts))
   return src(path.src.fonts)
      .pipe(ttf2woff2())
      .pipe(dest(path.build.fonts))
}
exports.fonts = fonts;

gulp.task('otf2ttf', function () {
   return gulp.src([srcFolder + '/fonts/*.otf'])
      .pipe(fonter({
         formats: ['ttf']
      }))
      .pipe(dest(srcFolder + '/fonts/'));
})

// gulp.task('svgSprite', function () {
//    return gulp.src([srcFolder + '/iconsprite/*.svg'])
//       .pipe(svgSprite({
//          mode: {
//             stack: {
//                sprite: "../icons/icons.svg",
//                example: true
//             }
//          },
//       }))
//       .pipe(dest(path.build.img))
// })

// Сходу не понял зачем и что даёт. Объясни?
// function fontsStyle(params) {
//    let file_content = fs.readFileSync(srcFolder + '/scss/fonts.scss');
//    if (file_content == '') {
//       fs.writeFile(srcFolder + '/scss/fonts.scss', '', cb);
//       return fs.readdir(path.build.fonts, function (err, items) {
//          if (items) {
//             let c_fontname;
//             for (var i = 0; i < items.length; i++) {
//                let fontname = items[i].split('.');
//                fontname = fontname[0];
//                if (c_fontname != fontname) {
//                   fs.appendFile(srcFolder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal")\r\n', cb);
//                }
//                c_fontname = fontname;
//                }
//             }
//          })
//       }
//    }

// function cb() {

// }