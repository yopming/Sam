var samApp = angular.module('sam', [
    'ja.qr',
    'ngRoute',
    'ngDialog',
    'ngSanitize',
    'samDashboardControllers',
    'samProjectControllers',
    'samOperationControllers',
    'samReferenceControllers',
    'samShareControllers',
    'samGraphicControllers',
    'samTimelineControllers',
    'samProjectServices',
    'samGraphicServices',
    'urlFilters',
    'samProjectFilters',
    'samOperationFilters',
    'samDirectives'
]);

samApp.config(['$locationProvider', '$routeProvider', '$httpProvider',
    function($locationProvider, $routeProvider, $httpProvider) {
        $locationProvider.html5Mode(false).hashPrefix('!');

        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];

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
        when('/graphic', {
            templateUrl: '/template/sam/graphic/graphic.html',
            controller: 'SamGraphicCtrl'
        }).
        when('/graphic/:path*', {
            templateUrl: '/template/sam/graphic/graphic.html',
            controller: 'SamGraphicCtrl'
        }).
        when('/timeline', {
            templateUrl: '/template/sam/timeline/timeline.html',
            controller: 'SamTimelineCtrl'
        }).
        otherwise({});
    }
]);