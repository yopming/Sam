var adminControllers = angular.module('adminControllers', ['ngCookies']);


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

	$http.get('/api/period/years').success(function(data) {
	  $scope.years = data;
	});

	$http.get('/api/period/months').success(function(data) {
	  $scope.months = data;
	});

	$http.get('/api/program/all').success(function(data) {
	  $scope.programs = data;
	});

	$http.get('/api/personnel/all').success(function(data) {
	  $scope.personnels = data;
	});

	$http.get('/api/status/all').success(function(data) {
	  $scope.statuses = data;
	});

	$scope.projectSave = function() {
	  // join two separated parameter: the version number consists of year and month and a solid string
	  if ($scope.project.related_version_year != undefined && $scope.project.related_version_month != undefined) {
		$scope.project.related_version = 'INS_PD_' + $scope.project.related_version_year + $scope.project.related_version_month;
	  }
	  $http.post('/api/task/project/add', $scope.project).success(function(data) {
		$location.url('/project');
	  });
	};
  }
]);

adminControllers.controller('AdminProjectEditCtrl', ['$scope', '$http', '$routeParams', '$location',
  function($scope, $http, $routeParams, $location) {
	var project_id = $routeParams.id;

	$scope.years = [
	  {value: '2012', name:'2012'},
	  {value: '2013', name:'2013'},
	  {value: '2014', name:'2014'},
	  {value: '2015', name:'2015'},
	  {value: '2016', name:'2016'}
	];

	$scope.months = [
	  {value: '01', name:'1'},
	  {value: '02', name:'2'},
	  {value: '03', name:'3'},
	  {value: '04', name:'4'},
	  {value: '05', name:'5'},
	  {value: '06', name:'6'},
	  {value: '07', name:'7'},
	  {value: '08', name:'8'},
	  {value: '09', name:'9'},
	  {value: '10', name:'10'},
	  {value: '11', name:'11'},
	  {value: '12', name:'12'},
	];

	$http.get('/api/program/all').success(function(data) {
	  $scope.programs = data;
	});

	$http.get('/api/personnel/all').success(function(data) {
	  $scope.personnels = data;
	});

	$http.get('/api/status/all').success(function(data) {
	  $scope.statuses = data;
	});

	$http.get('/api/task/' + project_id).success(function(data) {
	  $scope.project = data;

	  // divide version parameter into year and month
	  if ($scope.project.related_version != undefined) {
		$scope.project.related_version_year = $scope.project.related_version.substr(7, 4);
		$scope.project.related_version_month = $scope.project.related_version.substr(11,2);
	  }
	});


	$scope.projectUpdate = function() {
	  // join version month and version year
	  if ($scope.project.related_version_year != undefined && $scope.project.related_version_month != undefined) {
		$scope.project.related_version = 'INS_PD_' + $scope.project.related_version_year + $scope.project.related_version_month;
	  }

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

adminControllers.controller('AdminMailAddCtrl', ['$scope', '$http', '$location', 
  function($scope, $http, $location) {
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

  }
]);

adminControllers.controller('AdminMailEditCtrl', ['$scope', '$http', '$routeParams', '$location',
  function($scope, $http, $routeParams, $location) {
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

  }
]);


/*
 * Topic
 */
adminControllers.controller('AdminTopicCtrl', ['$scope', '$http', '$location',
  function($scope, $http) {
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

adminControllers.controller('AdminTopicAddCtrl', ['$scope', '$http', '$location',
  function($scope, $http, $location) {
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
  }
]);

adminControllers.controller('AdminTopicEditCtrl', ['$scope', '$http', '$routeParams', '$location',
	function($scope, $http, $routeParams, $location) {
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
	}
]);


/*
 * Share
 */
adminControllers.controller('AdminShareCtrl', ['$scope', '$http', 
	function($scope, $http) {
		$http.get('/api/share/all').success(function(data) {
			$scope.shares = data;
		});
		

		$scope.deleteShare = function(id) {
			$http.post('/api/share/destroy/' + id).success(function(data) {
				$scope.shares = data;
			});
		};
	}
]);

adminControllers.controller('AdminShareAddCtrl', ['$scope', '$http', '$location',
	function($scope, $http, $location) {
		$scope.share = {}

		$http.get('/api/user/all').success(function(data) {
			$scope.users = data;
		});

		$scope.shareSave = function() {
			$http.post('/api/share/add', $scope.share).success(function(data) {
				$location.url('/share');
			});
		};
	}
]);

adminControllers.controller('AdminShareEditCtrl', ['$scope', '$http', '$location', '$routeParams',
	function($scope, $http, $location, $routeParams) {
		var share_id = $routeParams.id;

		$scope.shareUpdate = function() {
			$http.post('/api/share/update/' + share_id, $scope.topic).success(function() {
				$location.url('/share');
			});
		};
	}
]);


/*
 * User
 */
adminControllers.controller('AdminUserCtrl', ['$scope', '$http', '$location', '$cookies',
  function($scope, $http, $location, $cookies) {
	var userNice = $cookies.group;
	if (userNice == 7) {
	  $scope.isRoot = true;
	} else {
	  $scope.isRoot = false;
	}

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
	$http.get('/api/group/all').success(function(data) {
	  $scope.groups = data;
	});

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

	$http.get('/api/group/all').success(function(data) {
	  $scope.groups = data;
	});

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
adminControllers.controller('AdminParameterCtrl', ['$scope', '$http', '$filter', '$cookies',
  function($scope, $http, $filter, $cookies) {
	var userNice = $cookies.group;
	if (userNice == 7) {
	  $scope.isRoot = true;
	} else {
	  $scope.isRoot = false;
	}

	$http.get('/api/group/all').success(function(data) {
	  $scope.groups = data;
	});
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

	// personnel order
	var orderBy = $filter('orderBy');
	$scope.order = function(predicate, reverse) {
	  $scope.personnels = orderBy($scope.personnels, predicate, reverse);
	};

	$scope.deletePosition = function(id) {
	  $http.post('/api/position/remove/' + id).success(function(data) {
		$scope.positions = data;
	  });
	};
	$scope.deletePersonnel = function(id) {
	  $http.post('/api/personnel/remove/' + id).success(function(data) {
		$scope.personnels = data;
	  });
	};
	$scope.deleteProgram = function(id) {
	  $http.post('/api/program/remove/' + id).success(function(data) {
		$scope.programs = data;
	  });
	};
	$scope.deletePipe = function(id) {
	  $http.post('/api/pipe/remove/' + id).success(function(data) {
		$scope.pipes = data;
	  });
	};
	$scope.deleteStatus = function(id) {
	  $http.post('/api/status/remove/' + id).success(function(data) {
		$scope.statuses = data;
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

