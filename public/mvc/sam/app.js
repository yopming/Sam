var samApp = angular.module('sam', [
    'ngRoute',
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

samApp.config(['$locationProvider', '$routeProvider',
    function ($locationProvider, $routeProvider) {
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
            when('/graphic', {
                templateUrl: '/template/sam/graphic/graphic.html',
                controller: 'SamGraphicRootCtrl'
            }).
            when('/graphic/:path*', {
                templateUrl: '/template/sam/graphic/graphic.html',
                controller: 'SamGraphicViewerCtrl'
            }).
            when('/timeline', {
                templateUrl: '/template/sam/timeline/timeline.html',
                controller: 'SamTimelineCtrl'
            }).
            otherwise({
            });
    }
]);
