module.exports = function(grunt) {
  grunt.initConfig({
    browserify: {
      "../dist/app.js": ["../js/*.js"]
    },
    options: {
      transform: ["hbsfy"],
      browserifyOptions: {
        paths: [
          "./node_modules"
        ]
      }
    },
    jshint: {
      options: {
        predef: ["document", "console", "Handlebars"],
        esnext: true,
        strict: "global",
        globals: { $: true, _: true },
        browserify: true,
        reporter: require("jshint-stylish")
      },
      files: ["../js/**/*.js"]
    },
    sass: {
      dist: {
        files: {
          "../dist/css/main.css": "../sass/styles.scss"
        }
      }
    },
    connect: {
      server: {
        options: {
          base: '../',
          hostname: 'localhost',
          port: 3000,
          livereload: true,
          open: true
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      index: {
        files: ["../index.html"]
      },
      javascripts: {
        files: ["../js/**/*.js"],
        tasks: ["jshint", "browserify"]
      },
      sass: {
        files: ["../sass/**/*.scss"],
        tasks: ["sass"]
      },
      browserify: {
        files: ["../js/*.js"],
        tasks: ["browserify"]
      }
    }
  });

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);
  grunt.registerTask("default", ["jshint", "sass", "browserify", "connect", "watch"]);
};
