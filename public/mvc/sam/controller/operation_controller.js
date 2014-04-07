var samOperationControllers = angular.module('samOperationControllers', []);

/*
 * Operation mail
 */
samOperationControllers.controller('SamOperationMailCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('/api/personnel/all').success(function(data) {
			$scope.personnels = data;
		});

		$http.get('/api/task/mail/all').success(function(data) {
			$scope.mails = data;
		});

		$scope.selected_atom = [];

		$scope.filterMailByAtom = function(id) {
			if (_.contains($scope.selected_atom, id)) {
				$scope.selected_atom = _.without($scope.selected_atom, id);
			} else {
				$scope.selected_atom.push(id);
			}
		};

		$scope.isChecked = function(id) {
			if (_.contains($scope.selected_atom, id)) {
				return "checkmark icon";
			}
			return false;
		};
	}
]);


samOperationControllers.controller('SamOperationTopicCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('/api/personnel/all').success(function(data) {
			$scope.personnels = data;
		});

		$http.get('/api/pipe/all').success(function(data) {
			$scope.pipes = data;
		});

		$http.get('/api/task/topic/all').success(function(data) {
			$scope.topics = data;
		});

		$scope.selected_atom = [];

		$scope.filterTopicByAtom = function(id) {
			if (_.contains($scope.selected_atom, id)) {
				$scope.selected_atom = _.without($scope.selected_atom, id);
			} else {
				$scope.selected_atom.push(id);
			}
		};

		$scope.isChecked = function(id) {
			if (_.contains($scope.selected_atom, id)) {
				return "checkmark icon";
			}
			return false;
		};
	}
]);
