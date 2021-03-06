let buildFolder = "build";
let srcFolder = "source";

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
const notify = require("gulp-notify");
const sourcemap = require("gulp-sourcemaps");
const fileinclude = require("gulp-file-include");
const browsersync = require("browser-sync").create();
const del = require("del");
const sass = require("gulp-sass");
const postcss = require('gulp-postcss');
const bulk = require("gulp-sass-bulk-importer");
const autoprefixer = require("autoprefixer");
const group_media = require("gulp-group-css-media-queries");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const spritesmith = require("gulp.spritesmith");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");
const htmlbeautify = require("gulp-html-beautify");
const fonter = require("gulp-fonter");
const webpackStream = require("webpack-stream");
const webpackConfig = require("./webpack.config.js");
const ghpages = require("gh-pages");
const ftp = require("vinyl-ftp");
const ftpSettings = require("./ftp_settings.json");
const connect = ftp.create(ftpSettings);

const html = () => {
  return src(['source/pages/**/*.html'])
    .pipe(plumber({
      errorHandler: function (err) {
        notify.onError({
          title: "HTML compilation error",
          message: err.message,
        })(err);
        this.emit("end");
      },
    }))
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file",
      context: require("./file-include-context")
    }))
    .pipe(
      htmlbeautify({
        indent_size: 2,
        preserve_newlines: true,
        max_preserve_newlines: 0,
        wrap_attributes: "auto",
      })
    )
    .pipe(dest('build'));
};
exports.html = html;

const css = () => {
  return src(path.src.css)
      .pipe(plumber({
          errorHandler: function (err) {
            notify.onError({
              title: "CSS compilation error",
              message: err.message,
            })(err);
            this.emit("end");
          },
        }))
      .pipe(sourcemap.init())
      // .pipe(bulk())
      .pipe(sass())
      .pipe(postcss([autoprefixer({
        // grid: true,
      })]))
      .pipe(group_media()) // ????????????????m??, ???????? ?? ???????????? ???????????????????? ???????????? ?????????? ???????????? ???? ?????????????? ????????????????
      .pipe(dest(path.build.css))
      .pipe(csso())
      .pipe(rename("style.min.css"))
      .pipe(sourcemap.write("."))
      .pipe(dest(path.build.css))
      .pipe(browsersync.stream())
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

const generatePngSprite = () => {
  // TODO: ???????????????? ?????????????????? png-??????????????
};

const syncserver = () => {
  browsersync.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false,
    ghostMode: true,
    // tunnel: "mansio-dev-preview2", // Attempt to use the URL https://yousutename.loca.lt
  });

  gulp.watch(path.watch.html, series(html, refresh));
  gulp.watch([path.watch.css, srcFolder + "/components/**/*.scss"], series(css));
  gulp.watch(path.watch.js, series(js, refresh));
  gulp.watch(`${srcFolder}/img/**/*.svg`, series(copysvg, sprite, html, refresh));
  gulp.watch(`${srcFolder}/img/**/*.{png,jpg,webp}`, series(copypngjpg, html, refresh));
  gulp.watch(`${srcFolder}/favicon/**`, gulp.series(copy, refresh));
  gulp.watch(`${srcFolder}/video/**`, gulp.series(copy, refresh));
  gulp.watch(`${srcFolder}/downloads/**`, gulp.series(copy, refresh));
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
    .src(srcFolder + "/img/**/*.{png,jpg,webp}", { base: srcFolder })
    .pipe(gulp.dest(buildFolder));
};

const copy = () => {
  return gulp
    .src(
      [
        `${srcFolder}/fonts/*.{woff,woff2}`,
        `${srcFolder}/img/**`,
        `${srcFolder}/favicon/**`,
        `${srcFolder}/video/**`,
        `${srcFolder}/downloads/**`,
        // srcFolder + '/data/**',
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

const deploy = (cb) => {
  ghpages.publish("build/", cb);
};
exports.deploy = deploy;

const build = series(clean, svgo, sprite, parallel(js, css, html, copy));
const start = series(build, syncserver);

exports.build = build;
exports.start = start;

// Optional tasks
//---------------------------------

// ???????????????????????? ???????????????? ???? ???????????????????? ???????????????? root, ???????? ?????????? ???????????????????? ?????????????????? ?????????? ?? img,
// ?? ???? ?????? ?????????????????????? ?? img ???? ???????? ????????????.

// root = `` - ???? ?????????????? webp ?????????????????????? ?? ???????????????????? ???? ???????? ???????????? ?? source/img/
// root = `content/` - webp ?????????????????????? ?? ?????????????????????? ???????????? ?? source/img/content/

const createWebp = () => {
  const root = `content/`;
  return gulp
    .src(`${srcFolder}/img/${root}**/*.{png,jpg}`)
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest(`${srcFolder}/img/${root}`));
};

exports.webp = createWebp;

const optimizeImages = () => {
  return gulp
    .src(`${srcFolder}/img/**/*.{png,jpg}`)
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 3 }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
      ])
    )
    .pipe(gulp.dest(buildFolder + "/img/"));
};

exports.imagemin = optimizeImages;

const deployFtp = () => {
  return src(["build/**/*.*", "!build/**/*.map"])
    .pipe(connect.newer("/mansio-group/public_html/"))
    .pipe(connect.dest("/mansio-group/public_html/"));
};

exports.deployFtp = deployFtp;

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
