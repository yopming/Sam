var urlFilters = angular.module('urlFilters', []);

urlFilters.filter('encode', function() {
    return window.encodeURIComponent;
});


urlFilters.filter('decode', function() {
    return window.decodeURIComponent;
});