var samProjectControllers = angular.module('samProjectControllers', []);

/*
 * Project
 */
samProjectControllers.controller('SamProjectCtrl', ['$scope', '$http', 'SamProjectService',
    function($scope, $http, SamProjectService) {
        $scope.programs = SamProjectService.getPrograms();
        $scope.statuses = SamProjectService.getStatuses();
        $scope.personnels = SamProjectService.getPersonnels();
        // $scope.versions = SamProjectService.getVersions();

        $http.get('/api/task/project/all').success(function(data) {
            $scope.projects = data;
        });

        $scope.selected_atom = [];

        $scope.filterProjectsByAtom = function(id) {
            if (_.contains($scope.selected_atom, id)) {
                $scope.selected_atom = _.without($scope.selected_atom, id);
            } else {
                $scope.selected_atom.push(id);
            }
            return false;
        };

        $scope.isChecked = function(id) {
            if (_.contains($scope.selected_atom, id)) {
                return "checkmark icon";
            }
            return false;
        };
    }
]);
