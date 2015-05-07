var adminApp = angular.module('sign', [])
    .controller('SignController', ['$scope', function($scope) {
        $scope.domain_fix = 'made-in-china.com';
        $scope.domain = $scope.domain_name + '@' + $scope.domain_fix;
        $scope.$watch('domain_name', function() {
            $scope.domain = $scope.domain_name + '@' + $scope.domain_fix;
        });
        $scope.$watch('domain_fix', function() {
            $scope.domain = $scope.domain_name + '@' + $scope.domain_fix;
        });
    }]);