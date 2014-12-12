var samShareControllers = angular.module('samShareControllers', []);

/*
 * Share
 */
samShareControllers.controller('SamShareCtrl', ['$scope', '$http', '$filter',
	function($scope, $http, $filter) {
		$http.get('/api/share/all').success(function(data) {
			$scope.shares = data;
		});

		// order
		var orderBy = $filter('orderBy');
		$scope.order = function(predicate, reverse) {
			$scope.shares = orderBy($scope.shares, predicate, reverse);
		}
	}
]);
