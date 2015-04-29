(function() {
    'use strict';

    angular.module('ngMarkdownPreview', [])

    .controller('Ctrl', ['$scope', '$window', '$http', '$sce',
        function($scope, $window, $http, $sce) {
            $scope.md2Html = function() {
                $scope.html = $window.marked($scope.markdown);
                $scope.htmlSafe = $sce.trustAsHtml($scope.html);
            };

            $scope.initFromUrl = function(url) {
                $http.get(url).success(function(data) {
                    $scope.markdown = data;
                    console.log(data);
                    return $scope.md2Html();
                });
            };

            $scope.initFromText = function(text) {
                $scope.markdown = text;
                $scope.md2Html();
            };
        }
    ])

    .directive('MD', function() {
        return {
            template: "<div><textarea ng-model='markdown' ng-change='md2Html()'></textarea><div ng-bind-html='htmlSafe' /></div>",
            restrict: 'C',
            replace: true,
            controller: 'Ctrl',
            scope: {},
            link: function(scope, element, attrs) {
                if (attrs.url) {
                    scope.initFromUrl(attrs.url);
                }
                if (attrs.text) {
                    scope.initFromText(attrs.text);
                }
                scope.textareaName = attrs.textareaName;
            }
        };
    });

}).call(this);