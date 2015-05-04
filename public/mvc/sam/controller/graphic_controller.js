var samGraphicControllers = angular.module('samGraphicControllers', []);

var remoteServer = 'http://192.168.17.135:54321/files';


/*
 * Graphic Viewer
 */
samGraphicControllers.controller('SamGraphicCtrl',
    ['$scope', '$http', '$location', 'ngDialog', 'SamGraphicService',

    function($scope, $http, $location, ngDialog, SamGraphicService) {

        var master = $location.url().split("/graphic")[1];
        $http.get(remoteServer + master).success(function(data) {
            var serial = _.toArray(data);

            $scope.nodes = serial;

            for (var i=serial.length-1; i>0; i--) {
                if (serial[i]['name'] == 'readme.txt') {
                    $scope.readme = marked(serial[i].content);
                }
            }
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

        $scope.ShowTooltip = function() {
            var link = "";
            var tar = angular.element(event.target)[0];
            var type = tar.attributes['data-type'].value;
            var down = tar.attributes['data-down'].value;

            if (type == 'File') {
                link = down;
            } else if (type == 'Directory') {
                link = $location.protocol() + "://" + $location.host() + ":" + $location.port() + "/#!/graphic/" + down;
            }

            var request = SamGraphicService.shorten(link);
            request.success(function(data) {
                $scope.link = data['shorten'];
                ngDialog.open({
                    template: 'sam-dialog',
                    scope: $scope,
                    className: 'ngdialog-theme-default sam-dialog-slim',
                    showClose: false
                });
            });
        };
    }
]);