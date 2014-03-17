var samProjectControllers = angular.module('samProjectControllers', []);

/*
 * Project
 */
samProjectControllers.controller('SamProjectCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/api/program/all').success(function(data) {
            $scope.programs = data;
        });

        $http.get('/api/status/all').success(function(data) {
            $scope.statuses = data;
        });

        $http.get('/api/personnel/all').success(function(data) {
            $scope.personnels = data;
        });

        $http.get('/api/version/all').success(function(data) {
            $scope.versions = data;
        });

        $http.get('/api/task/project/all').success(function(data) {
            $scope.projects = data;
        });
    }
]);
