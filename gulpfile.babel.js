import gulp from 'gulp';
import shell from 'gulp-shell';
import run from 'run-sequence';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import webpack from 'webpack-stream';
import path from 'path';

const PATHS = {
  build: path.resolve(__dirname, 'build'),
  bundle: path.resolve(__dirname, 'public/js'),
  src: path.resolve(__dirname, 'src'),
  src_api: path.resolve(__dirname, 'src/api/**/*.js'),
  endpoints: path.resolve(__dirname, 'api/**/*.js'),
  sass: path.resolve(__dirname, 'src/sass/**/*.scss'),
  react: path.resolve(__dirname, 'src/react/**/*.js'),
  api: path.resolve(__dirname, 'api')
}

gulp.task('default', (cb) => {
  run('sass','webpack','api','server','restart','watch',cb);
}).on('error', console.log);

gulp.task('prod-build', (cb) => {
  run('sass-prod','webpack-prod','prod-clean');
});

gulp.task('sass', shell.task(['compass compile ./src']));
gulp.task('sass-prod', shell.task(['compass compile ./src -e production']));

gulp.task('prod-clean', shell.task([
    `echo '~~~~~~~~  UPDATING THE BUILD FOLDER  ~~~~~~~~'`,
    `rm -rf build/*`,
    `cp -a ./public/* ./build/`,
    `rm build/css/main.css.map build/js/bundle.js public/js/bundle.min.js`,
    `sed -i '' -e 's/bundle/bundle.min/g' ./build/index.html`
  ])
);


gulp.task('api', shell.task([
  'mkdir -p api',
  // 'babel ./src/api --out-dir ./api/ --no-comments --minified'
  'babel ./src/api --out-dir ./api/ --no-comments'
]));

gulp.task('webpack',()=>{
  return gulp.src('./src/react/index.js')
  .pipe(webpack({
    watch: false,
    entry: PATHS.src + "/react/index.js",
    output: {
      path: PATHS.bundle,
      filename: 'bundle.js'
    },
    module: {
      loaders: [{
        loader:'babel-loader',
        include: PATHS.src,
        test: /\.jsx?$/,
        query:{
          plugins:['transform-runtime'],
          presets:['es2015','stage-0','react']
        }
      }]
    },
  }))
  .on('error', function handleError() {
    this.emit('end'); // Recover from errors
  })
  .pipe(gulp.dest(PATHS.bundle));
});

gulp.task('webpack-prod', shell.task(['webpack -p']));

let express;
gulp.task('server', ()=>{ express = server.new(`${PATHS.api}/randomcolorstripes.server.js`); });
gulp.task('restart', ()=>{express.start.bind(express)(); });


gulp.task('watch', ()=>{
  gulp.watch(PATHS.react, ['webpack','restart']);
  gulp.watch(PATHS.src_api, ['webpack','restart']);
  gulp.watch(PATHS.endpoints, ['api','restart']);
  gulp.watch(PATHS.sass, ['sass']);
});
