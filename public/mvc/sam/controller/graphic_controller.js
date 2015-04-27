var samGraphicControllers = angular.module('samGraphicControllers', []);

var remoteServer = 'http://192.168.17.135:54321/files';

/*
 * Graphic Root
 */
samGraphicControllers.controller('SamGraphicRootCtrl', ['$scope', '$http', 'SamGraphicService',
    function ($scope, $http, SamGraphicService) {
        $http.get(remoteServer).success(function (data) {
            $scope.nodes = _.toArray(data);
        });

        $scope.Shorten = function(node) {
            node_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/#!/graphic/" + node.down;
            var result = SamGraphicService.shortenUrl(node_url);
            console.log(result);
        };
    }
]);


/*
 * Graphic Viewer
 */
samGraphicControllers.controller('SamGraphicViewerCtrl', ['$scope', '$http', '$location', 'SamGraphicService',
    function ($scope, $http, $location, SamGraphicService) {
        var master = $location.url().split("/graphic")[1];
        $http.get(remoteServer + master).success(function (data) {
            $scope.nodes = _.toArray(data);
        });

        var crumbs = $location.url().split("/graphic/")[1].split("/");

        var breadcrumb = new Array();
        var link = "/#!/graphic";
        for (var i=0; i<crumbs.length; i++) {
            link += ("/" + crumbs[i]);
            var _bread = new Array(link, crumbs[i]);
            breadcrumb[i] = _bread;
        }

        $scope.breadcrumb = breadcrumb;

        $scope.Shorten = function(node) {
            node_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/#!/graphic/" + node.down;
            var result = SamGraphicService.shortenUrl(node_url);
            console.log(result);
        };
    }
]);