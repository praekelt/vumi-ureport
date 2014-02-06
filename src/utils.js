vumi_ureport.utils = function() {
    function join_paths() {
        return Array.prototype.filter.call(arguments, function(path) {
            return !!path;
        }).join('/');
    }

    return {
        join_paths: join_paths
    };
}();
