module.exports = function (grunt) {
    var paths = require('./paths');

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        paths: paths,

        watch: {
            src: {
                files: ['<%= paths.src.all %>'],
                tasks: ['build']
            }
        },

        concat: {
            prd: {
                src: ['<%= paths.src.prd %>'],
                dest: '<%= paths.dest.prd %>'
            },

            demo: {
                src: ['<%= paths.src.demo %>'],
                dest: '<%= paths.dest.demo %>'
            },
        },

        mochaTest: {
            test: {
                src: [
                    '<%= paths.test.requires %>',
                    '<%= paths.test.spec %>'
                ],
                options: {
                    reporter: 'spec'
                }
            }
        }
    });

    grunt.registerTask('test', [
        'build',
        'mochaTest'
    ]);

    grunt.registerTask('build', [
        'concat',
    ]);

    grunt.registerTask('default', [
        'build',
        'test'
    ]);
};
