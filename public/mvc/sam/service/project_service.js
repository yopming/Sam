var samProjectServices = angular.module('samProjectServices', ['ngResource']);

/*
 * Project
 */
samProjectServices.factory('SamProjectService', ['$http', '$resource',
    function($http, $resource) {
        var programs = $resource('/api/program/all', {}, {
            query: {method: 'GET', isArray:true}
        });

        var statuses = $resource('/api/status/all', {}, {
            query: {method: 'GET', isArray:true}
        });

        var personnels = $resource('/api/personnel/all', {}, {
            query: {method: 'GET', isArray:true}
        });

        var versions = $resource('/api/version/all', {}, {
            query: {method: 'GET', isArray:true}
        });

        return {
            getPrograms: function() {
                return programs.query();
            },
            getStatuses: function() {
                return statuses.query();
            },
            getPersonnels: function() {
                return personnels.query();
            },
            getVersions: function() {
                return versions.query();
            }
        };
    }
]);
