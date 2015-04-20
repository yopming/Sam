var samGraphicControllers = angular.module('samGraphicControllers', []);


/*
 * Graphic
 */
samGraphicControllers.controller('SamGraphicCtrl', ['$rootScope',
    function($rootScope) {
        $rootScope.remoteServer = 'http://192.168.17.135:54321/files';
    }
]);


/*
 * Graphic Root
 */
samGraphicControllers.controller('SamGraphicRootCtrl', ['$scope', '$http', '$rootScope',
    function($scope, $http, $rootScope) {
        $http.get($rootScope.remoteServer).success(function(data) {
            $scope.nodes = _.toArray(data);
        });
    }
]);


/*
 * Graphic Viewer
 */
samGraphicControllers.controller('SamGraphicViewerCtrl', ['$scope', '$http', '$location', '$rootScope',
    function($scope, $http, $location, $rootScope) {
        var master = $location.url().split("/graphic")[0];
        console.log($rootScope.remoteServer + master);
        $http.get($rootScope.remoteServer + master).success(function(data) {
            $scope.nodes = _.toArray(data);
        });
    }
]);