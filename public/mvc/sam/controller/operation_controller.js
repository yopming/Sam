var samOperationControllers = angular.module('samOperationControllers', []);

/*
 * Operation mail
 */
samOperationControllers.controller('SamOperationMailCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/api/personnel/all').success(function(data) {
            $scope.personnels = data;
        });

        $http.get('/api/task/mail/all').success(function(data) {
            $scope.mails = data;
        });
    }
]);


samOperationControllers.controller('SamOperationTopicCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/api/personnel/all').success(function(data) {
            $scope.personnels = data;
        });

        $http.get('/api/pipe/all').success(function(data) {
            $scope.pipes = data;
        });

        $http.get('/api/task/topic/all').success(function(data) {
            $scope.topics = data;
        });
    }
]);
