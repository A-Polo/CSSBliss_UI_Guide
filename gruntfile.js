module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    sass: {
      dist: {
        options: {
          style: 'expanded',
          compass: true
        },
        files: {
          'styles/css/index.css': 'styles/scss/index.scss'
        }
      }
    },

    //Post process autoprefix
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'ie 8', 'ie 9']
      },
      main: {
        expand: true,
        flatten: true,
        src: 'styles/css/*.css',
        dest: 'styles/css/'
      }
    },

    //Auto-watching you changes (type CTRL + S for save changes & it`ll work)
    watch: {
      css: {
        files: ['styles/**/*.scss'],
        tasks: ['sass','autoprefixer']
      }
    }
    
  });

  //Load Tasks
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-watch');

  //Register Tasks
  grunt.registerTask('default', ['sass', 'autoprefixer']);
};
