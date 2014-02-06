var src = exports.src = {};

src.app = [
    'src/index.js',
    'src/utils.js',
    'src/api.js',
    'src/app.js'
];

src.dummy = [
    'src/fixtures.js',
    'src/dummy.js'
];

src.lib = [].concat(
    src.app,
    src.dummy);

src.demo = [].concat(src.lib, [
    'src/demo.js'
]);

src.prd = [].concat(src.app, [
    'src/init.js'
]);

src.all = [
    'src/**/*.js'
];

module.exports = {
    src: src,
    dest: {
        prd: 'vumi-ureport.js',
        demo: 'vumi-ureport.demo.js'
    },
    test: {
        spec: [
            'test/**/*.test.js'
        ],
        requires: [
            'test/setup.js'
        ]
    }
};
