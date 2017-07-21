module.exports = function(grunt) {
  grunt.initConfig({
    uglify: {
      prod: {
        files: [{
          expand: true,
          cwd: 'script/js/',
          src: [
            '*.js',
            '!*min.js'
          ],
          dest: 'script/minified/',
          ext: '.min.js'
        }]
      }
    },
    sass: {
      dev: {
        options: {
          style: 'expanded',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'style/scss',
          src: ['*.scss'],
          dest: 'style/css/',
          ext: '.css'
        }]
      },
      prod: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: [{
          expand: true,
          cwd: 'style/scss',
          src: ['*.scss'],
          dest: 'style/css/',
          ext: '.css'
        }]
      }
    },
    concat: {
      devcss: {
        options: {
          separator: '',
        },
        src: [
          'style/css/*.css',
        ],
        dest: 'style/style.min.css',
      },
      prodcss: {
        options: {
          separator: '',
        },
        src: [
          'style/css/*.css',
        ],
        dest: 'style/style.min.css',
      },
      devjs: {
        options: {
          separator: '',
        },
        src: [
          'script/preload/*.js',
          'script/js/*.js'
        ],
        dest: 'script/script.min.js',
      },
      prodjs: {
        options: {
          separator: '',
        },
        src: [
          'script/preload/*.js',
          'script/minified/*min.js',
        ],
        dest: 'script/script.min.js',
      }
    },
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: 'last 5 versions'
          }),
        ]
      },
      dist: {
        src: 'style/style.min.css'
      }
    },
    watch: {
      scripts: {
        files: [
          'script/indexHelper.html',
          'script/js/*.js',
          '!*.min.js'
        ],
        tasks: [
          'uglify:prod',
          'concat:prodjs'
        ],
        options: {
          spawn: false,
        }
      },
      devscripts: {
        files: [
          'script/indexHelper.html',
          'script/preload/*.js',
          'script/js/*.js',
          '!*.min.js'
        ],
        tasks: [
          'concat:devjs'
        ],
        options: {
          spawn: false,
        }
      },
      styles: {
        files: [
          'style/scss/*.scss'
        ],
        tasks: [
          'sass:prod',
          'concat:prodcss',
          'postcss'
        ],
        options: {
          spawn: false,
        }
      },
      devstyles: {
        files: [
          'style/scss/*.scss'
        ],
        tasks: [
          'sass:dev',
          'concat:devcss',
          'postcss'
        ],
        options: {
          spawn: false,
        }
      }
    },
    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      prod: {
        tasks: [
          'watch:scripts',
          'watch:styles'
        ]
      },
      dev: {
        tasks: [
          'watch:devscripts',
          'watch:devstyles'
        ]
      }
    }
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-concurrent');

  grunt.registerTask('production', ['uglify:prod', 'sass:prod', 'concat:prodcss', 'postcss', 'concat:prodjs', 'concurrent:prod']);
  grunt.registerTask('dev', ['sass:dev', 'concat:devcss', 'postcss', 'concat:devjs', 'concurrent:dev']);
};