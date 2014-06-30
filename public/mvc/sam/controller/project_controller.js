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

      /* extract the versions related to the projects appeared */
      $scope.versions = [];
      // uniq the version
      var _versions = [];
      for (var i in $scope.projects) {
        _versions[i] = $scope.projects[i].related_version;
      }
      uniqedVersions = _.uniq(_versions);
      // combined into array
      for (var j in uniqedVersions) {
        $scope.versions[j] = [];
        $scope.versions[j]._id = uniqedVersions[j];
      }
      var asc = function(x, y) {
        return x-y;
      }
      $scope.versions = _.uniq($scope.versions.sort(asc));
    });


    // sidebar sort according to creteria
    $scope.selected_atom = {
      "program" : {"id": '', "name": ""},
      "status"  : {"id": '', "name": ""},
      "ia"      : {"id": '', "name": ""},
      "ga"      : {"id": '', "name": ""},
      "fe"      : {"id": '', "name": ""},
      "pd"      : {"id": '', "name": ""},
      "version" : {"id": '', "name": ""},
    };

    $scope.filterProjectsByAtom = function(id, genre, name) {
      if ($scope.selected_atom[genre].id == id) {
        $scope.selected_atom[genre].id = '';
        $scope.selected_atom[genre].name = '';
      } else {
        $scope.selected_atom[genre].id = id;
        $scope.selected_atom[genre].name = name;
      }
      return false;
    };

    $scope.isChecked = function(id, genre) {
      if ($scope.selected_atom[genre].id == id) {
        return "checkmark icon";
      }
      return false;
    };

    // Remove the criteria which is been clicking
    $scope.removeCriteria = function(id) {
      for (var i in $scope.selected_atom) {
        if ($scope.selected_atom[i].id == id) {
          $scope.selected_atom[i].id = '';
        }
      }
    }

  }
]);
