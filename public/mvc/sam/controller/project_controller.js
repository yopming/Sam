var samProjectControllers = angular.module('samProjectControllers', []);

/*
 * Project
 */
samProjectControllers.controller('SamProjectCtrl', ['$scope', '$http', 'SamProjectService',
  function($scope, $http, SamProjectService) {
    $scope.programs = SamProjectService.getPrograms();
    $scope.statuses = SamProjectService.getStatuses();
    $scope.personnels = SamProjectService.getPersonnels();

    $http.get('/api/task/project/all').success(function(data) {
      $scope.projects = data;
      // extract the versions related to the projects appeared
    });


    // sidebar sort according to creteria
    $scope.selected_atom = {
      "program" : {"id": ''},
      "status"  : {"id": ''},
      "ia"      : {"id": ''},
      "ga"      : {"id": ''},
      "fe"      : {"id": ''},
      "pd"      : {"id": ''},
      "version" : {"id": ''},
    };

    $scope.filterProjectsByAtom = function(id, genre) {
      if ($scope.selected_atom[genre].id == id) {
        $scope.selected_atom[genre].id = '';
      } else {
        $scope.selected_atom[genre].id = id;
      }
      return false;
    };

    // Checked cretera in sidebar
    $scope.isChecked = function(id, genre) {
      if ($scope.selected_atom[genre].id == id) {
        return "checkmark icon";
      }
      return false;
    };

  }
]);
