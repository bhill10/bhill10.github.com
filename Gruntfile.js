module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    watch: {
      scss: {
        files: ['sass/**/*.{sass,scss}'],
        tasks: 'sass'
      },
      html: {
        files: ['src/**/*.hbs'],
        tasks: 'html'
      },
      js: {
        files: ['js/**/*.js'],
        tasks: 'js'
      },
      img: {
        files: ['images/**/*.*'],
        tasks: 'img'
      },
      json: {
        files: ['src/data/**/*.*'],
        tasks: 'json'
      }
    },

    sass: {
      build: {
        options : {
          style : 'expanded'
        },
        expand : true,
        cwd : 'sass',
        src : ['**/*.{sass,scss}', '!**/_*.{sass,scss}'],
        dest : 'styles',
        ext : '.css',
      }
    },

    // https://github.com/nDmitry/grunt-autoprefixer
    autoprefixer: {
      build: {
        options: {
          browsers: ['last 2 versions', '> 1%']
        },
        files: [
          {
            src : ['**/*.css', '!**/*autoprefixed.css'],
            cwd : 'styles',
            dest : 'styles',
            ext : '.autoprefixed.css',
            expand : true
          }
        ]
      }
    },

    connect: {
      server: {
        options: {
          port: 8000,
          base: 'dist'
        }
      }
    },

    assemble: {
      options: {
        flatten: true,
        layout: 'layout.hbs',
        layoutdir: 'src/templates/layouts',
        assets: 'dist/assets',
        partials: ['src/templates/pages/*.hbs', 'src/templates/parts/*.hbs'],
        marked: {
          breaks: false,
          gfm: true,
          highlight: function (code, lang, callback)  {
            pygmentize(
              {lang: lang,format: 'html'},
              code,
              function (err, result)  { 
                callback(err, result.toString());
              }
            );
          },
          langPrefix: 'language-',
          pedantic: false,
          sanitize: false,
          silent: false,
          smartLists: false,
          smartypants: false,
          tables: true
        }
      },
      demo: {
        options: {
            data: ['src/data/*.{json,yml}'],
            helpers: ['handlebars-helper-repeat', '*.js']
        },
        files: {
            'dist/': ['src/templates/pages/*.hbs']
        }
      }
    },

    imagemin: {
        dynamic: {
            files: [{
                    expand: true,
                    cwd: './images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/assets/images'
                }]
        }
    },

    htmlmin: {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                removeCommentsFromCDATA: true,
                removeRedundantAttributes: true,
                collapseBooleanAttributes: true
            },
            files: {
                 'dist/index.html': 'dist/index.html'
            }
        }
    },

    copy: {
      css: {
        files: [
          { expand: true, cwd: './styles', src: ['./**/*.*'], dest: 'dist/assets/css' }
        ]
      },
      js: {
        files: [
          { expand: true, cwd: './js', src: ['./**/*.*'], dest: 'dist/assets/js' }
        ]
      },
      fonts: {
        files: [
          { expand: true, cwd: './fonts', src: ['./**/*.*'], dest: 'dist/assets/fonts' }
        ]
      }
    }

  });


  // Default task
  grunt.registerTask('default', ['sass', 'autoprefixer', 'assemble', 'htmlmin', 'copy']);

  grunt.registerTask('scss', ['sass', 'autoprefixer','copy:css']);
  grunt.registerTask('html', ['assemble']);
  grunt.registerTask('json', ['assemble']);
  grunt.registerTask('js', ['copy:js']);
  grunt.registerTask('img', ['imagemin']);


  grunt.loadNpmTasks('assemble');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

};
