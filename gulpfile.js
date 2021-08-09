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
    js: srcFolder + "/js/main.js",
    img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,wepb}",
    fonts: srcFolder + "/fonts/*.ttf",
  },
  watch: {
    html: srcFolder + "/**/*.html",
    css: srcFolder + "/scss/**/*.scss",
    js: srcFolder + "/js/**/*.{js,json}",
    img: srcFolder + "/img/**/*.{jpg,png,svg,gif,ico,wepb}",
  },
  clean: "./" + buildFolder + "/",
};

const { series, parallel, src, dest, watch, lastRun } = require("gulp");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const browsersync = require("browser-sync").create();
const del = require("del");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const clean_css = require("gulp-clean-css");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const htmlbeautify = require("gulp-html-beautify");
const rsync = require("gulp-rsync");
const fonter = require("gulp-fonter");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");

const html = () => {
  return src(path.src.html)
    .pipe(
      fileinclude({
        prefix: "@@",
        basepath: "@file",
        context: {
          // глобальные переменные для include
          test: "text",
        },
      })
    )
    .pipe(
      htmlbeautify({
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 0,
        wrap_attributes: "auto",
      })
    )
    .pipe(dest(path.build.html));
};
exports.html = html;

const css = () => {
  return src(path.src.css)
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass({ outputStyle: "expanded" }))
    .pipe(autoprefixer({
      overrideBrowserslist: ["last 5 versions"],
      cascade: true,
      grid: true,
    }))
    .pipe(group_media())// выключитmь, если в проект импортятся шрифты через ссылку на внешний источник
    .pipe(dest(path.build.css))
    .pipe(clean_css())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemap.write('.'))
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
};
exports.css = css;

const js = () => {
  return src(path.src.js)
    .pipe(webpackStream(webpackConfig))
    .pipe(dest(path.build.js));
};
exports.js = js;

const svgo = () => {
  return gulp
    .src(srcFolder + "/img/**/*.{svg}")
    .pipe(
      imagemin([
        imagemin.svgo({
          plugins: [
            { removeViewBox: false },
            { removeRasterImages: true },
            { removeUselessStrokeAndFill: false },
          ],
        }),
      ])
    )
    .pipe(gulp.dest(srcFolder + "/img"));
};
exports.svgo = svgo;

const sprite = () => {
  return gulp
    .src(srcFolder + "/img/sprite/*.svg")
    .pipe(svgstore({ inlineSvg: true }))
    .pipe(rename("sprite_auto.svg"))
    .pipe(gulp.dest(buildFolder + "/img"));
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
    ghostMode: { clicks: false },
    // tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
  });

  gulp.watch(path.watch.html, series(html, refresh));
  gulp.watch(
    [path.watch.css, srcFolder + "/components/**/*.scss"],
    series(css, refresh)
  );
  gulp.watch(path.watch.js, series(js, refresh));
  gulp.watch(
    srcFolder + "/img/**/*.svg",
    series(copysvg, sprite, html, refresh)
  );
  gulp.watch(
    srcFolder + "/img/**/*.{png,jpg}",
    series(copypngjpg, html, refresh)
  );

  gulp.watch(srcFolder + "/favicon/**", gulp.series(copy, refresh));
};

const refresh = (done) => {
  browsersync.reload();
  done();
};

const copysvg = () => {
  return gulp
    .src(srcFolder + "/img/**/*.svg", { base: srcFolder })
    .pipe(gulp.dest(buildFolder));
};

const copypngjpg = () => {
  return gulp
    .src(srcFolder + "/img/**/*.{png,jpg}", { base: srcFolder })
    .pipe(gulp.dest(buildFolder));
};

const copy = () => {
  return gulp
    .src(
      [
        srcFolder + "/fonts/*.{woff,woff2}",
        srcFolder + "/img/**",
        // srcFolder + '/data/**',
        srcFolder + "/favicon/**",
        // srcFolder + '/video/**',
        // srcFolder + '/downloads/**',
        // srcFolder + '/*.php',
      ],
      {
        base: srcFolder,
      }
    )
    .pipe(gulp.dest(buildFolder));
};
exports.copy = copy;

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
  return gulp
    .src(srcFolder + `/img/${root}**/*.{png,jpg}`)
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest(srcFolder + `/img/${root}`));
};

const optimizeImages = () => {
  return gulp
    .src(buildFolder + "/img/**/*.{png,jpg}")
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
      ])
    )
    .pipe(gulp.dest(buildFolder + "/img"));
};

const deploy = () => {
  return src("build/").pipe(
    rsync({
      root: "build/",
      hostname: "cl315565@fortuna.timeweb.ru",
      destination: "preview-mg/public_html",
      // clean: true, // Mirror copy with file deletion
      include: [
        /* '*.htaccess' */
      ], // Included files to deploy,
      exclude: ["**/Thumbs.db", "**/*.DS_Store"],
      recursive: true,
      archive: true,
      silent: false,
      compress: true,
    })
  );
};

exports.build = build;
exports.start = start;
exports.webp = createWebp;
exports.imagemin = optimizeImages;
exports.deploy = deploy;

gulp.task("otf2ttf", function () {
  return gulp
    .src([srcFolder + "/fonts/*.otf"])
    .pipe(
      fonter({
        formats: ["ttf"],
      })
    )
    .pipe(dest(srcFolder + "/fonts/"));
});

function fonts() {
  return src(path.src.fonts)
    .pipe([ttf2woff(), ttf2woff2()])
    .pipe(dest(srcFolder + "fonts/"));
}
exports.fonts = fonts;
