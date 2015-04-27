var samGraphicControllers = angular.module('samGraphicControllers', []);

var remoteServer = 'http://192.168.17.135:54321/files';


/*
 * Graphic Root
 */
samGraphicControllers.controller('SamGraphicRootCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get(remoteServer).success(function(data) {
            $scope.nodes = _.toArray(data);
        });
    }
]);


/*
 * Graphic Viewer
 */
samGraphicControllers.controller('SamGraphicViewerCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        var master = $location.url().split("/graphic")[1];
        $http.get(remoteServer + master).success(function(data) {
            $scope.nodes = _.toArray(data);
        });

        var crumbs = $location.url().split("/graphic/")[1].split("/");
        $scope.crumbs = crumbs;

        var crumbs = new Array();

    }
]);