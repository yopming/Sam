var samGraphicControllers = angular.module('samGraphicControllers', []);

var remoteServer = 'http://192.168.17.135:54321/files';


/*
 * Graphic Viewer
 */
samGraphicControllers.controller('SamGraphicCtrl', ['$scope', '$http', '$location', 'SamGraphicService',
    function($scope, $http, $location, SamGraphicService) {
        var master = $location.url().split("/graphic")[1];
        $http.get(remoteServer + master).success(function(data) {
            $scope.nodes = _.toArray(data);
        });

        // internal page, the root page won't do this function
        if (master != "") {
            var crumbs = $location.url().split("/graphic/")[1].split("/");
            var breadcrumb = new Array();
            var link = "/#!/graphic";
            for (var i = 0; i < crumbs.length; i++) {
                link += ("/" + crumbs[i]);
                var _bread = new Array(link, crumbs[i]);
                breadcrumb[i] = _bread;
            }
            $scope.breadcrumb = breadcrumb;
        }

        $scope.ShortenForDir = function(node) {
            node_url = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/#!/graphic/" + node.down;

            var request = SamGraphicService.shorten(node_url);
            request.success(function(data) {
                return data['shorten'];
            });
        };

        $scope.ShortenForFile = function(node) {
            var request = SamGraphicService.shorten(node);
            request.success(function(data) {
                return data['shorten'];
            });
        };

        $scope.ShowTooltip = function() {
        };
    }
]);