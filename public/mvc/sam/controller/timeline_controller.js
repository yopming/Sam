var samTimelineControllers = angular.module('samTimelineControllers', []);

/*
 * Timeline
 */
samTimelineControllers.controller('SamTimelineCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/api/task/all/descending').success(function(data) {
            $scope.timelines = data;
        });
    }
]);
