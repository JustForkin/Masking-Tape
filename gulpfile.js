var gulp   = require("gulp")
   ,concat = require("gulp-concat")
   ,uglify = require("gulp-uglifyjs");

var paths = {
  src: ["src/*.js"]
};

gulp.task("build", function() {
  return gulp.src(paths.src)
    .pipe(concat("masking-tape.js"))
    .pipe(gulp.dest("./dist"))
    .pipe(uglify("masking-tape.min.js"))
    .pipe(gulp.dest("./dist"));
});

gulp.task("watch", function() {
  gulp.watch(paths.src, ["build"]);
});

gulp.task("default", ["build", "watch"]);
