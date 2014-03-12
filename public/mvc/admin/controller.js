var adminControllers = angular.module('adminControllers', []);

/*
 * Sift
 */
adminControllers.controller('AdminSiftCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/json/project.json').success(function(data) {
            $scope.projects = data;
        });
    }
]);


/*
 * Project
 */
adminControllers.controller('AdminProjectCtrl', ['$scope',
    function($scope) {
    }
]);

adminControllers.controller('AdminProjectAddCtrl', ['$scope',
    function($scope) {
    }
]);

adminControllers.controller('AdminProjectEditCtrl', ['$scope',
    function($scope) {
    }
]);


/*
 * Mail
 */
adminControllers.controller('AdminMailCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $http.get('/api/mail/all').success(function(data) {
            $scope.mails = data;
        });

        $scope.deleteMail = function(id) {
            $http.post('/api/mail/destroy/' + id).success(function(data) {
                $scope.mails = data;
            });
        };
    }
]);

adminControllers.controller('AdminMailAddCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $http.get('/api/personnel/all').success(function(data) {
            $scope.personnels = data;
        });

        $scope.mailSave = function() {
            $http.post('/api/mail/add', $scope.mail).success(function(data) {
                $location.url('/mail');
            });
        };
    }
]);

adminControllers.controller('AdminMailEditCtrl', ['$scope', '$http', '$routeParams', '$location',
    function($scope, $http, $routeParams, $location) {
        var mail_id = $routeParams.id;

        $http.get('/api/mail/' + mail_id).success(function(data) {
            $scope.mail = data;
        });

        $scope.mailUpdate = function() {
            $http.post('/api/mail/update/' + mail_id, $scope.mail).success(function() {
                $location.url('/mail');
            });
        };
    }
]);


/*
 * Topic
 */
adminControllers.controller('AdminTopicCtrl', ['$scope',
    function($scope) {
    }
]);

adminControllers.controller('AdminTopicAddCtrl', ['$scope',
    function($scope) {
    }
]);

adminControllers.controller('AdminTopicEditCtrl', ['$scope',
    function($scope) {
    }
]);


/*
 * User
 */
adminControllers.controller('AdminUserCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $http.get('/api/user/all').success(function(data) {
            $scope.users = data;
        });

        $scope.deleteUser = function(id) {
            $http.post('/api/user/destroy/' + id).success(function(data) {
                $scope.users = data;
            });
        };

    }
]);

adminControllers.controller('AdminUserAddCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.userSave = function() {
            $http.post('/api/user/add', $scope.user).success(function(data) {
                $location.url('/user');
            });
        };
    }
]);

adminControllers.controller('AdminUserEditCtrl', ['$scope', '$http', '$routeParams', '$location',
    function($scope, $http, $routeParams, $location) {
        var user_id = $routeParams.id;

        $http.get('/api/user/' + user_id).success(function(data) {
            $scope.user = data;
        });

        $scope.userUpdate = function() {
            $http.post('/api/user/update/' + user_id, $scope.user).success(function() {
                $location.url('/user');
            });
        };

    }
]);



/*
 * Parameter
 */
adminControllers.controller('AdminParameterCtrl', ['$scope', '$http',
    function($scope, $http) {
        $http.get('/api/position/all').success(function(data) {
            $scope.positions = data;
        });
        $http.get('/api/personnel/all').success(function(data) {
            $scope.personnels = data;
        });
        $http.get('/api/status/all').success(function(data) {
            $scope.statuses = data;
        });
        $http.get('/api/pipe/all').success(function(data) {
            $scope.pipes = data;
        });
        $http.get('/api/version/all').success(function(data) {
            $scope.versions = data;
        });
        
        $scope.deletePosition = function(id) {
            $http.post('/api/position/destroy/' + id).success(function(data) {
                $scope.positions = data;
            });
        };
        $scope.deletePersonnel = function(id) {
            $http.post('/api/personnel/destroy/' + id).success(function(data) {
                $scope.personnels = data;
            });
        };
        $scope.deletePipe = function(id) {
            $http.post('/api/pipe/destroy/' + id).success(function(data) {
                $scope.pipes = data;
            });
        };
        $scope.deleteStatus = function(id) {
            $http.post('/api/status/destroy/' + id).success(function(data) {
                $scope.statuses = data;
            });
        };
        $scope.deleteVersion = function(id) {
            $http.post('/api/version/destroy/' + id).success(function(data) {
                $scope.versions = data;
            });
        };
    }
]);

// Parameter Position
adminControllers.controller('AdminParameterPositionAddCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.positionSave = function() {
            $http.post('/api/position/add', $scope.position).success(function(data) {
                $location.url('/parameter');
            });
        };
    }
]);

// Parameter Personnel
adminControllers.controller('AdminParameterPersonnelAddCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $http.get('/api/position/all').success(function(data) {
            $scope.positions = data;
        });

        $scope.personnelSave = function() {
            $http.post('/api/personnel/add', $scope.personnel).success(function(data) {
                $location.url('/parameter');
            });
        };
    }
]);

// Parameter Status
adminControllers.controller('AdminParameterStatusAddCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.statusSave = function() {
            $http.post('/api/status/add', $scope.status).success(function(data) {
                $location.url('/parameter');
            });
        };
    }
]);

// Parameter Version
adminControllers.controller('AdminParameterVersionAddCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.versionSave = function() {
            $http.post('/api/version/add', $scope.version).success(function(data) {
                $location.url('/parameter');
            });
        };
    }
]);

// Parameter Release Pipe
adminControllers.controller('AdminParameterReleasePipeAddCtrl', ['$scope', '$http', '$location',
    function($scope, $http, $location) {
        $scope.pipeSave = function() {
            $http.post('/api/pipe/add', $scope.pipe).success(function(data) {
                $location.url('/parameter');
            });
        };
    }
]);
