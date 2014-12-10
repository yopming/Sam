var samApp = angular.module('sam', [
  'ngRoute',
  'samDashboardControllers',
  'samProjectControllers',
  'samOperationControllers',
  'samReferenceControllers',
  'samShareControllers',
  'samTimelineControllers',
  'samProjectServices',
  'samProjectFilters',
  'samOperationFilters',
  'samDirectives'
]);

samApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {
	$locationProvider.html5Mode(false).hashPrefix('!');

	$routeProvider.
	when('/', {
		redirectTo: '/project'
	}).
	when('/project', {
		templateUrl: '/template/sam/project/project.html',
		controller: 'SamProjectCtrl'
	}).
	when('/operation/mail', {
		templateUrl: '/template/sam/operation/mail.html',
		controller: 'SamOperationMailCtrl'
	}).
	when('/operation/topic', {
		templateUrl: '/template/sam/operation/topic.html',
		controller: 'SamOperationTopicCtrl'
	}).
	when('/share', {
		templateUrl: '/template/sam/share/share.html',
		controller: 'SamShareCtrl'
	}).
	when('/timeline', {
		templateUrl: '/template/sam/timeline/timeline.html',
		controller: 'SamTimelineCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
  }
]);
