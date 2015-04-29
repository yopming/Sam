var samGraphicServices = angular.module('samGraphicServices', []);

/*
 * Graphic
 */
samGraphicServices.service('SamGraphicService', ['$http',
    function($http) {
        return ({
            shorten: getShorten
        });

        function getShorten(node_url) {
            var result;

            var request = $http({
                url: "http://img.vemic.com/j/shorten",
                method: "POST",
                params: {
                    url: node_url
                }
            });

            return (request);
        }

    }
]);