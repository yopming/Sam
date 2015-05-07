var adminApp = angular.module('admin', [
	'ngRoute',
	'pickadate',
	'simditor',
	'routeStyles',
	'adminControllers',
	'adminDirectives'
]);

adminApp.config(['$locationProvider', '$routeProvider',
	function ($locationProvider, $routeProvider) {

		$locationProvider.html5Mode(false).hashPrefix('!');

		$routeProvider.
		when('/', {
			redirectTo: '/project'
		}).

		when('/project', {
			templateUrl: '/template/admin/project/project.html',
			controller: 'AdminProjectCtrl'
		}).
		when('/project/add', {
			templateUrl: '/template/admin/project/project_add.html',
			controller: 'AdminProjectAddCtrl'
		}).
		when('/project/edit/:id', {
			templateUrl: '/template/admin/project/project_edit.html',
			controller: 'AdminProjectEditCtrl'
		}).

		when('/mail', {
			templateUrl: '/template/admin/mail/mail.html',
			controller: 'AdminMailCtrl'
		}).
		when('/mail/add', {
			templateUrl: '/template/admin/mail/mail_add.html',
			controller: 'AdminMailAddCtrl'
		}).
		when('/mail/edit/:id', {
			templateUrl: '/template/admin/mail/mail_edit.html',
			controller: 'AdminMailEditCtrl'
		}).

		when('/topic', {
			templateUrl: '/template/admin/topic/topic.html',
			controller: 'AdminTopicCtrl'
		}).
		when('/topic/add', {
			templateUrl: '/template/admin/topic/topic_add.html',
			controller: 'AdminTopicAddCtrl'
		}).
		when('/topic/edit/:id', {
			templateUrl: '/template/admin/topic/topic_edit.html',
			controller: 'AdminTopicEditCtrl'
		}).

		when('/share', {
			templateUrl: '/template/admin/share/share.html',
			controller: 'AdminShareCtrl'
		}).
		when('/share/add', {
			templateUrl: '/template/admin/share/share_add.html',
			controller: 'AdminShareAddCtrl'
		}).
		when('/share/edit/:id', {
			templateUrl: '/template/admin/share/share_edit.html',
			controller: 'AdminShareEditCtrl'
		}).

		when('/media', {
			templateUrl: '/template/admin/media/media.html',
			controller: 'AdminMediaCtrl'
		}).
		when('/media/add', {
			templateUrl: '/template/admin/media/media_add.html',
			controller: 'AdminMediaAddCtrl'
		}).

		when('/domain', {
			templateUrl: '/template/admin/domain/domain.html',
			controller: 'AdminDomainCtrl'
		}).

		when('/parameter', {
			templateUrl: '/template/admin/parameter/parameter.html',
			controller: 'AdminParameterCtrl'
		}).
		when('/position-add', {
			templateUrl: '/template/admin/parameter/position_add.html',
			controller: 'AdminParameterPositionAddCtrl'
		}).
		when('/personnel-add', {
			templateUrl: '/template/admin/parameter/personnel_add.html',
			controller: 'AdminParameterPersonnelAddCtrl'
		}).
		when('/program-add', {
			templateUrl: '/template/admin/parameter/program_add.html',
			controller: 'AdminParameterProgramAddCtrl'
		}).
		when('/releasePipe-add', {
			templateUrl: '/template/admin/parameter/releasePipe_add.html',
			controller: 'AdminParameterReleasePipeAddCtrl'
		}).
		when('/status-add', {
			templateUrl: '/template/admin/parameter/status_add.html',
			controller: 'AdminParameterStatusAddCtrl'
		}).
		otherwise({
			redirectTo: '/'
		});
	}
]);
