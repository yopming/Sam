var adminControllers = angular.module('adminControllers', []);

/*
 * Sift
 */
adminControllers.controller('AdminSiftCtrl', ['$scope', '$http',
  function($scope, $http) {
  }
]);


/*
 * Project
 */
adminControllers.controller('AdminProjectCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('/api/task/project/all').success(function(data) {
      $scope.projects = data;
    });

    $scope.deleteProject = function(id) {
      $http.post('/api/task/project/destroy/' + id).success(function(data) {
        $scope.projects = data;
      });
    };
  }
]);

adminControllers.controller('AdminProjectAddCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.project = {};
    $scope.project.category = 'project';

    $http.get('/api/program/all').success(function(data) {
      $scope.programs = data;
    });

    $http.get('/api/personnel/all').success(function(data) {
      $scope.personnels = data;
    });

    $http.get('/api/status/all').success(function(data) {
      $scope.statuses = data;
    });

    $http.get('/api/version/all').success(function(data) {
      $scope.versions = data;
    });

    $scope.projectSave = function() {
      $http.post('/api/task/project/add', $scope.project).success(function(data) {
        $location.url('/project');
      });
    };
  }
]);

adminControllers.controller('AdminProjectEditCtrl', ['$scope', '$http', '$routeParams', '$location',
  function($scope, $http, $routeParams, $location) {
    var project_id = $routeParams.id;

    $http.get('/api/program/all').success(function(data) {
      $scope.programs = data;
    });

    $http.get('/api/personnel/all').success(function(data) {
      $scope.personnels = data;
    });

    $http.get('/api/status/all').success(function(data) {
      $scope.statuses = data;
    });

    $http.get('/api/version/all').success(function(data) {
      $scope.versions = data;
    });

    $http.get('/api/task/' + project_id).success(function(data) {
      $scope.project = data;
    });

    $scope.projectUpdate = function() {
      $http.post('/api/task/project/update/' + project_id, $scope.project).success(function() {
        $location.url('/project');
      });
    };
  }
]);


/*
 * Mail
 */
adminControllers.controller('AdminMailCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('/api/task/mail/all').success(function(data) {
      $scope.mails = data;
    });

    $scope.deleteMail = function(id) {
      $http.post('/api/task/mail/destroy/' + id).success(function(data) {
        $scope.mails = data;
      });
    };
  }
]);

adminControllers.controller('AdminMailAddCtrl', ['$scope', '$http', '$location', '$fileUploader',
  function($scope, $http, $location, $fileUploader) {
    $scope.mail = {};
    $scope.mail.category = 'mail';

    $http.get('/api/personnel/all').success(function(data) {
      $scope.personnels = data;
    });

    $scope.mailSave = function() {
      $http.post('/api/task/mail/add', $scope.mail).success(function(data) {
        $location.url('/mail');
      });
    };

    // upload
    var uploader = $scope.uploader = $fileUploader.create({
      scope: $scope,
      url: '/api/tribute/add',
      autoUpload: true,
      method: 'POST'
    });

    uploader.bind('success', function(event, item, progress) {
      $scope.mail.head_image = item.response;
    });

  }
]);

adminControllers.controller('AdminMailEditCtrl', ['$scope', '$http', '$routeParams', '$location', '$fileUploader',
  function($scope, $http, $routeParams, $location, $fileUploader) {
    var mail_id = $routeParams.id;

    $http.get('/api/personnel/all').success(function(data) {
      $scope.personnels = data;
    });

    $http.get('/api/task/' + mail_id).success(function(data) {
      $scope.mail = data;
      $scope.dataUrl = $scope.mail.head_image;
    });

    $scope.mailUpdate = function() {
      $http.post('/api/task/mail/update/' + mail_id, $scope.mail).success(function() {
        $location.url('/mail');
      });
    };

    // upload
    var uploader = $scope.uploader = $fileUploader.create({
      scope: $scope,
      url: '/api/tribute/add',
      autoUpload: true,
      method: 'POST'
    });

    uploader.bind('success', function(event, item, progress) {
      $scope.mail.head_image = item.response;
    });

  }
]);


/*
 * Topic
 */
adminControllers.controller('AdminTopicCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $http.get('/api/task/topic/all').success(function(data) {
      $scope.topics = data;
    });

    $scope.deleteTopic = function(id) {
      $http.post('/api/task/topic/destroy/' + id).success(function(data) {
        $scope.topics = data;
      });
    };
  }
]);

adminControllers.controller('AdminTopicAddCtrl', ['$scope', '$http', '$location', '$fileUploader',
  function($scope, $http, $location, $fileUploader) {
    $scope.topic = {};
    $scope.topic.category = 'topic';

    $http.get('/api/personnel/all').success(function(data) {
      $scope.personnels = data;
    });

    $http.get('/api/pipe/all').success(function(data) {
      $scope.pipes = data;
    });

    $scope.topicSave = function() {
      $http.post('/api/task/topic/add', $scope.topic).success(function(data) {
        $location.url('/topic');
      });
    };

    // upload
    var uploader = $scope.uploader = $fileUploader.create({
      scope: $scope,
      url: '/api/tribute/add',
      autoUpload: true,
      method: 'POST'
    });

    uploader.bind('success', function(event, item, progress) {
      $scope.topic.head_image = item.response;
    });
  }
]);

adminControllers.controller('AdminTopicEditCtrl', ['$scope', '$http', '$routeParams', '$location', '$fileUploader',
  function($scope, $http, $routeParams, $location, $fileUploader) {
    var topic_id = $routeParams.id;

    $http.get('/api/personnel/all').success(function(data) {
      $scope.personnels = data;
    });

    $http.get('/api/pipe/all').success(function(data) {
      $scope.pipes = data;
    });

    $http.get('/api/task/' + topic_id).success(function(data) {
      $scope.topic = data;
    });

    $scope.topicUpdate = function() {
      $http.post('/api/task/topic/update/' + topic_id, $scope.topic).success(function() {
        $location.url('/topic');
      });
    };

    // upload
    var uploader = $scope.uploader = $fileUploader.create({
      scope: $scope,
      url: '/api/tribute/add',
      autoUpload: true,
      method: 'POST'
    });

    uploader.bind('success', function(event, item, progress) {
      $scope.topic.head_image = item.response;
    });
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
    $http.get('/api/program/all').success(function(data) {
      $scope.programs = data;
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
    $scope.deleteProgram = function(id) {
      $http.post('/api/program/destroy/' + id).success(function(data) {
        $scope.programs = data;
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

// Parameter Program
adminControllers.controller('AdminParameterProgramAddCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
    $scope.programSave = function() {
      $http.post('/api/program/add', $scope.program).success(function(data) {
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
