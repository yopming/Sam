var adminDirectives = angular.module('adminDirectives', []);

/*
 * Detect the tab active class
 */
adminDirectives.directive('adminActive', ['$location',
  function($location) {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs, controller) {
        var classname = attrs.adminActive;
        var path = attrs.href;
        path = path.substring(2); // '#!'
        scope.location = $location;
        scope.$watch('location.path()', function(newPath) {
          if (path === newPath) {
            element.addClass(classname);
          } else {
            element.removeClass(classname);
          }
        });
      }
    }
  }
]);
