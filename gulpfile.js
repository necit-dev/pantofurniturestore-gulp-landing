// import { task, src, dest, watch, parallel, series } from 'gulp';
import pkg from 'gulp';
const { task, src, dest, watch, parallel, series } = pkg;
// const sass = require('gulp-sass')(require('sass'));
import clean from 'gulp-clean';
import { existsSync } from 'fs';
import server from 'gulp-server-livereload';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import pugs from 'gulp-pug';
import ng_sass from 'sass';
import g_sass from 'gulp-sass';
const sass = g_sass(ng_sass);

task('html', function(){
	return src('./src/html/*.html')
		.pipe(dest('./_public/'))
});

task('pug', function(){
	return src('./src/pug/*.pug')
		.pipe(pugs({
			pretty: true
		}))
		.pipe(dest('./_public/'))
});

task('sass', function(){
	return src('./src/sass/*.scss')
		.pipe(sass())
		.pipe(dest('./_public/css'))
});

task('js', function(){
	return src('./src/js/**/*.js')
		.pipe(babel())
		.pipe(uglify())
		.pipe(dest('./_public/js'))
});

task('img', function(){
	return src('./src/img/**/*.{jpg,webp,svg,png,gif,ico}')
		.pipe(dest('./_public/img'))
});

task('fonts', function(){
	return src('./src/fonts/**/*.{woff,woff2, eot, ttf}')
		.pipe(dest('./_public/fonts'));
})

task('clean', function(cb){
	if (existsSync('./_public/')){
		return src('./_public/', {read: false})
			.pipe(clean({force: true}));
	}
	cb();
});


const serverOptions = {
	livereload: true,
	open: true
}

task('startServer', function() {
	return src('./_public/')
		.pipe(server(serverOptions));
})
// Использование PUG-файлов
// task('watch', function(){
// 	watch('./src/sass/**/*.scss', parallel('sass'));
// 	watch('./src/pug/**/*.pug', parallel('pug'));
// 	watch('./src/img/**/*.{jpg,webp,svg,png,gif,ico}', parallel('img'));
// 	watch('./src/js/**/*.js', parallel('js'));
// })

// task('default', series(
// 	'clean',
// 	parallel('pug', 'sass', 'img', 'js'),
// 	parallel('startServer', 'watch')
// ))
// Использование HTML-файлов

task('watch', function(){
	watch('./src/sass/**/*.scss', parallel('sass'));
	watch('./src/html/**/*.html', parallel('html'));
	watch('./src/img/**/*.{jpg,webp,svg,png,gif,ico}', parallel('img'));
	watch('./src/js/**/*.js', parallel('js'));
	watch('./src/fonts/**/*.{woff,woff2}', parallel('fonts'));
})

task('default', series(
	'clean',
	parallel('html', 'sass', 'img', 'js', 'fonts'),
	parallel('startServer', 'watch')
))