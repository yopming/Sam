var samShareControllers = angular.module('samShareControllers', []);

/*
 * Share
 */
samShareControllers.controller('SamShareCtrl', ['$scope', '$http',
	function($scope, $http) {
		$http.get('/api/share/all').success(function(data) {
			$scope.shares = data;
		});
	}
]);
