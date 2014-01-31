module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({
        paths: {
            dest: 'lib/vumi-ureport.js',
            src: {
                app: [
                    'src/index.js',
                    'src/app.js',
                    'src/init.js'
                ]
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
                    '<%= paths.src.app %>'
                ],
                tasks: ['build']
            }
        },

        concat: {
            app: {
                src: ['<%= paths.src.app %>'],
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
