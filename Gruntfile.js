module.exports = function (grunt) {
  var transport = require('grunt-cmd-transport');
  var style = transport.style.init(grunt);
  var text = transport.text.init(grunt);
  var script = transport.script.init(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    transport: {
      options: {
        paths: ['.'],
        include: 'relative',
        alias: '<%= pkg.options.alias %>',
        parsers: {
          '.js': [script.jsParser],
          '.css': [style.css2jsParser],
          '.html': [text.html2jsParser]
        }
      },

      dialog: {
        options: {
          idleading: 'dist/src/'
        },

        files: [
          {
            cwd: 'src/',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/src'
          }
        ]
      },

      app1: {
        options: {
          idleading: 'dist/app/'
        },

        files: [
          {
            cwd: 'app',
            src: '**/*',
            filter: 'isFile',
            dest: '.build/app'
          }
        ]
      }
    },

    concat: {
      options: {
        paths: ['.'],
        include: 'relative',
        stripBanners: true,
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +'<%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },

      dialog: {
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['src/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },

      app1: {
        options: {
          include: 'all'
        },
        files: [
          {
            expand: true,
            cwd: '.build/',
            src: ['app/**/*.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },

    uglify: {
      dialog: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['src/**/*.js', '!src/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      },

      app1: {
        files: [
          {
            expand: true,
            cwd: 'dist/',
            src: ['app/**/*.js', '!app/**/*-debug.js'],
            dest: 'dist/',
            ext: '.js'
          }
        ]
      }
    },

    clean: {
      spm : ['.build']
    }
  });

  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.registerTask('dialog', ['transport:dialog', 'concat:dialog']);
  // grunt.registerTask('app1', ['transport:app1', 'concat:app1']);
  grunt.registerTask('dialog', ['transport:dialog', 'concat:dialog', 'uglify:dialog', 'clean']);
  grunt.registerTask('app1', ['transport:app1', 'concat:app1', 'uglify:app1', 'clean']);
};