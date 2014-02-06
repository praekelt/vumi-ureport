var path = require('path');
require('mocha-as-promised')();

var paths = require('../paths');
paths.src.lib.forEach(function(p) {
    require(path.join('..', p));
});
