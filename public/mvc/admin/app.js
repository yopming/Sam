var adminApp = angular.module('admin', [
  'ngRoute',
  'adminControllers',
  'pickadate',
  'angularFileUpload'
]);

adminApp.config(['$locationProvider', '$routeProvider',
  function($locationProvider, $routeProvider) {

    $locationProvider.html5Mode(false).hashPrefix('!');

    $routeProvider.
    when('/', {
      templateUrl: '/template/admin/sift.html',
      controller: 'AdminSiftCtrl'
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
      controller: 'AdminTopicCtrl',
    }).
    when('/topic/add', {
      templateUrl: '/template/admin/topic/topic_add.html',
      controller: 'AdminTopicAddCtrl',
    }).
    when('/topic/edit/:id', {
      templateUrl: '/template/admin/topic/topic_edit.html',
      controller: 'AdminTopicEditCtrl',
    }).

    when('/user', {
      templateUrl: '/template/admin/user/user.html',
      controller: 'AdminUserCtrl'
    }).
    when('/user/add', {
      templateUrl: '/template/admin/user/user_add.html',
      controller: 'AdminUserAddCtrl'
    }).
    when('/user/edit/:id', {
      templateUrl: '/template/admin/user/user_edit.html',
      controller: 'AdminUserEditCtrl'
    }).

    when('/parameter', {
      templateUrl: '/template/admin/parameter/parameter.html',
      controller: 'AdminParameterCtrl'
    }).
    when('/parameter/position/add', {
      templateUrl: '/template/admin/parameter/position_add.html',
      controller: 'AdminParameterPositionAddCtrl'
    }).
    when('/parameter/personnel/add', {
      templateUrl: '/template/admin/parameter/personnel_add.html',
      controller: 'AdminParameterPersonnelAddCtrl'
    }).
    when('/parameter/program/add', {
      templateUrl: '/template/admin/parameter/program_add.html',
      controller: 'AdminParameterProgramAddCtrl'
    }).
    when('/parameter/status/add', {
      templateUrl: '/template/admin/parameter/status_add.html',
      controller: 'AdminParameterStatusAddCtrl'
    }).
    when('/parameter/version/add', {
      templateUrl: '/template/admin/parameter/version_add.html',
      controller: 'AdminParameterVersionAddCtrl'
    }).
    when('/parameter/releasePipe/add', {
      templateUrl: '/template/admin/parameter/releasePipe_add.html',
      controller: 'AdminParameterReleasePipeAddCtrl'
    }).
    otherwise({
      redirectTo: '/'
    });

  }
]);
