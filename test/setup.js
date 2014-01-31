var path = require('path');
require('mocha-as-promised')();

require('../paths').forEach(function(p) {
    require(path.join('..', p));
});
