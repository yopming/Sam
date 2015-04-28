var samDirectives = angular.module('samDirectives', []);

/*
 * Detect tab active class
 */
samDirectives.directive('samActive', ['$location',
    function($location) {
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs, controller) {
                var classname = attrs.samActive;
                var path = attrs.href;
                path = path.substring(2); // '#!'
                scope.location = $location;
                scope.$watch('location.path()', function(newPath) {
                    if (newPath.indexOf(path) == 0) {
                        element.addClass(classname);
                    } else {
                        element.removeClass(classname);
                    }
                });
            }
        }
    }
]);


/*
 * Toggle Tooltip
 */
samDirectives.directive('samTooltip', [,
    function() {
    }
]);
