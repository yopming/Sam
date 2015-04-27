var samGraphicServices = angular.module('samGraphicServices', []);

/*
 * Graphic
 */
samGraphicServices.factory('SamGraphicService', ['$http',
    function($http){
        return {
            shortenUrl: function(node_url){
                var url = "http://img.vemic.com/j/shorten";

                var shorten = $http({
                    url: url,
                    method: "POST",
                    data: {
                        url: node_url
                    }
                });
                shorten.success(function(data) {
                    result = data['shorten'];
                });
                return result;
            }
        };
    }
]);