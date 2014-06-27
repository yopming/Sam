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
