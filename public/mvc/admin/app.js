var adminApp = angular.module('admin', [
    'ngRoute',
    'adminControllers'
]);

adminApp.config(['$locationProvider', '$routeProvider',
    function($locationProvider, $routeProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');

        $routeProvider.
        when('/sift', {
            templateUrl: '/template/admin/sift.html',
            controller: 'AdminSiftCtrl'
        }).
        when('/project', {
            templateUrl: '/template/admin/project.html',
            controller: 'AdminProjectCtrl'
        }).
        when('/mail', {
            templateUrl: '/template/admin/mail.html',
            controller: 'AdminMailCtrl'
        }).
        when('/topic', {
            templateUrl: '/template/admin/topic.html',
            controller: 'AdminTopicCtrl',
        }).
        when('/user', {
            templateUrl: '/template/admin/user/user.html',
            controller: 'AdminUserCtrl'
        }).
        when('/user/add', {
            templateUrl: '/template/admin/user/add.html',
            controller: 'AdminUserAddCtrl'
        }).
        when('/user/edit/:id', {
            templateUrl: '/template/admin/user/edit.html',
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
