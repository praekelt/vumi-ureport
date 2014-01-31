module.exports = function (grunt) {
    var paths = require('./paths');

    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        paths: {
            dest: 'lib/vumi-ureport.js',
            src: {
                app: paths,
                init: 'src/init.js'
            },
            test: {
                spec: [
                    'test/**/*.test.js'
                ],
                requires: [
                    'test/setup.js'
                ]
            }
        },

        watch: {
            app: {
                files: [
                    '<%= paths.src.app %>',
                    '<%= paths.src.init %>'
                ],
                tasks: ['build']
            }
        },

        concat: {
            app: {
                src: [
                    '<%= paths.src.app %>',
                    '<%= paths.src.init %>'
                ],
                dest: '<%= paths.dest %>'
            },
        },

        mochaTest: {
            test: {
                src: [
                    '<%= paths.src.app %>',
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
