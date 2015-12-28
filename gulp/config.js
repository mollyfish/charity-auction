var src = './app';
var dest = './build';

module.exports = {
  webpackDev: {
    src: src + '/js/**/*.js',
    dest: dest + '/js/',
    entryPoint: src + '/js/entry.js',
    packedFile: 'bundle.js'
  },
  webpackTest: {
    src: 'test/client/test_entry.js',
    dest: 'test/client/',
    packedFile: 'test.bundle.js'
  },
  sass: {
    src: src + '/styles/**/*.{sass,scss}',
    dest: dest + '/styles/',
    settings: {
      indentedSyntax: true,
    }
  },
  html: {
    src: src + "/*.html",
    dest: dest,
  },
  views: {
    src: src + '/js/templates/*.html',
    dest: dest + '/views/'
  },
  server: {
    serverFile: './server.js'
  },
  production: {
    cssSrc: dest + '/styles/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
