var samGraphicControllers = angular.module('samGraphicControllers', []);

/*
 * Graphic
 */
samGraphicControllers.controller('SamGraphicCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('http://192.168.17.135:54321/files').success(function(data) {
            $scope.nodes = data;
        });
    }
]);