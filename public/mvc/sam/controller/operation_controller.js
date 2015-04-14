var samOperationControllers = angular.module('samOperationControllers', []);

/*
 * Operation mail
 */
samOperationControllers.controller('SamOperationMailCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('/api/period/years').success(function(data) {
      $scope.years = data;
    });

    $http.get('/api/period/months').success(function(data) {
      $scope.months = data;
    });

    $http.get('/api/personnel/all').success(function(data) {
      $scope.personnels = data;
    });

    $http.get('/api/task/mail/all').success(function(data) {
      $scope.mails = data;
    });

    $scope.selected_atom = {
      "ga"    : {"id": '', "name": ''},
      "fe"    : {"id": '', "name": ''},
      "year"  : {"id": '', "name": ''},
      "month"  : {"id": '', "name": ''}
    };

    $scope.filterMailsByAtom = function(id, genre, name) {
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
    $scope.isDateChecked = function(id, genre) {
      if ($scope.selected_atom[genre].id == id) {
        return true;
      }
      return false;
    };


    $scope.removeCriteria = function(id) {
      for (var i in $scope.selected_atom) {
        if ($scope.selected_atom[i].id == id) {
          $scope.selected_atom[i].id = '';
        }
      }
    };

    // Reset the criteria
    $scope.resetCriteria = function() {
      for (var i in $scope.selected_atom) {
        $scope.selected_atom[i].id = '';
      }
    };

    $scope.isCriteriaValid = function() {
      var validCount = 0;
      for (var i in $scope.selected_atom) {
        if ($scope.selected_atom[i].id != '') {
          validCount ++;
        }
      }
      return validCount <= 0 ? false : true;
    }

  }
]);


samOperationControllers.controller('SamOperationTopicCtrl', ['$scope', '$http',
  function($scope, $http) {
    $http.get('/api/period/years').success(function(data) {
      $scope.years = data;
    });

    $http.get('/api/period/months').success(function(data) {
      $scope.months = data;
    });

    $http.get('/api/personnel/all').success(function(data) {
      $scope.personnels = data;
    });

    $http.get('/api/pipe/all').success(function(data) {
      $scope.pipes = data;
    });

    $http.get('/api/task/topic/all').success(function(data) {
      $scope.topics = data;
    });

    $scope.selected_atom = {
      "pipe": {"id": '', "name": ''},
      "ga": {"id": '', "name": ''},
      "fe": {"id": '', "name": ''},
      "year"  : {"id": '', "name": ''},
      "month"  : {"id": '', "name": ''}
    };

    $scope.filterTopicsByAtom = function(id, genre, name) {
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
    $scope.isDateChecked = function(id, genre) {
      if ($scope.selected_atom[genre].id == id) {
        return true;
      }
      return false;
    };

    $scope.removeCriteria = function(id) {
      for (var i in $scope.selected_atom) {
        if ($scope.selected_atom[i].id == id) {
          $scope.selected_atom[i].id = '';
        }
      }
    };

    // Reset the criteria
    $scope.resetCriteria = function() {
      for (var i in $scope.selected_atom) {
        $scope.selected_atom[i].id = '';
      }
    };

    $scope.isCriteriaValid = function() {
      var validCount = 0;
      for (var i in $scope.selected_atom) {
        if ($scope.selected_atom[i].id != '') {
          validCount ++;
        }
      }
      return validCount <= 0 ? false : true;
    }

  }
]);
