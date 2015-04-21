var urlFilters = angular.module('urlFilters', []);

urlFilters.filter('escape', function() {
    return window.encodeURIComponent;
});