var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	cleanCss = require('gulp-clean-css'),
	pump = require('pump'),
	plugins = require('gulp-load-plugins')();

//--------------浏览器自动刷新---------------

gulp.task('serve', ['sersass'], function() {

	browserSync.init({
		server: './src'
	});

	gulp.watch('src/sass/*.scss', ['scss']);
	gulp.watch('src/index.html').on('change', browserSync.reload);
});

gulp.task('sersass', function() {
	return gulp.src('src/sass/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass().on('error', plugins.sass.logError))
		.pipe(plugins.sourcemaps.write('./maps'))
		.pipe(gulp.dest('src/css'))
		.pipe(browserSync.stream());
});
// 
gulp.task('livereload', ['serve']);

//---------------------sass编译,监控------------------

gulp.task('scss', function() {
	return gulp.src('src/sass/*.scss')
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.sass().on('error', plugins.sass.logError))
		.pipe(plugins.sourcemaps.write('./maps'))
		.pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', ['scss'], function() {
	gulp.watch('src/sass/*.scss', ['scss']);
});

gulp.task('sass', ['sass:watch']);

//---------------------压缩js---------------------

gulp.task('js', function() {
	return gulp.src('src/js/*.js')
		.pipe(plugins.uglify())
		// .pipe(plugins.concat('src.js'))
		/*.pipe(plugins.rename(function (path) {
		  path.basename += '.min';
		  return path;
		}))*/
		.pipe(gulp.dest('dist/js'));
});

gulp.task('compass', function(cb) {
	pump([
			gulp.src('src/js/*.js'),
			plugins.uglify(),
			gulp.dest('dist/js')
		],
		cb
	);
});
//------------加前缀、压缩css---------------

gulp.task('mincss', function() {
	return gulp.src('src/css/*.css')
		.pipe(plugins.autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(cleanCss({
			compatibility: 'ie7'
		}))
		.pipe(gulp.dest('dist/css'));
});

//---------------压缩HTML----------------

gulp.task('minhtml', function() {
	return gulp.src('src/*.html')
		.pipe(plugins.htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('dist'));
});

//---------------图片压缩----------------

gulp.task('minimg', function() {
	return gulp.src('src/img/**/*')
		.pipe(plugins.imagemin())
		.pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['mincss', 'minhtml', 'minimg', "js"]);
