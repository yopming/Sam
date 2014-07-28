/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var lessMiddleware = require('less-middleware');
var flash = require('express-flash');
var minify = require('express-minify');
var compress = require('compression');

// mongoose setup
require('./model/schema.js');
var helper_auth = require('./helper/auth.js');


var app = express();

// routes
var routes_sam           = require('./routes/sam/route.js');
var routes_admin         = require('./routes/admin/route.js');
var routes_api_task      = require('./routes/api/task.js');
var routes_api_user      = require('./routes/api/user.js');
var routes_api_group     = require('./routes/api/group.js');
var routes_api_position  = require('./routes/api/position.js');
var routes_api_personnel = require('./routes/api/personnel.js');
var routes_api_program   = require('./routes/api/program.js');
var routes_api_pipe      = require('./routes/api/pipe.js');
var routes_api_status    = require('./routes/api/status.js');
var routes_api_tribute   = require('./routes/api/tribute.js');

// all environments
app.use(express.compress());

// less-middleware
// sequence of lessMiddleware and express.static should be like this, not inverse
app.use(lessMiddleware({
  src: __dirname + '/public/less',
  dest: __dirname + '/public/css',
  prefix: '/css',
  compress: true
  //force: true,
  //debug: true
}));
app.use(express.static(__dirname + '/public'));

app.use(express.cookieParser('samauth'));
app.use(express.session());
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(flash());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// minify
app.use(function(req, res, next) {
  // do not mangle -angular.js files
  if (/-angular\.js$/.test(req.url)) {
    res._no_mangle = true;
  }
  next();
});
app.use(minify());

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// route
app.get('/', routes_sam.index);

app.get('/sign', routes_admin.sign);
app.post('/signin', routes_admin.signin);
app.get('/signout', helper_auth.requiredAuth, routes_admin.signout);
// app.get('/admin', helper_auth.requiredAuth, routes_admin.admin);
// temporary remov auth requirement
app.get('/admin', routes_admin.admin);

// APIs
app.get('/api/task/all', routes_api_task.index);
app.get('/api/task/all/:sequence', routes_api_task.indexSort);
app.get('/api/task/:task_id', routes_api_task.indexOne);
app.get('/api/task/:category/all', routes_api_task.categoryIndex);
app.post('/api/task/:category/add', routes_api_task.create);
app.post('/api/task/:category/destroy/:task_id', routes_api_task.destroy);
app.post('/api/task/:category/update/:task_id', routes_api_task.update);

app.get('/api/user/all', routes_api_user.index);
app.get('/api/user/:user_id', routes_api_user.indexOne);
app.post('/api/user/add', routes_api_user.create);
app.post('/api/user/destroy/:user_id', routes_api_user.destroy);
app.post('/api/user/update/:user_id', routes_api_user.update);

app.get('/api/group/all', routes_api_group.index);

app.get('/api/position/all', routes_api_position.index);
app.post('/api/position/add', routes_api_position.create);
app.post('/api/position/destroy/:position_id', routes_api_position.destroy);

app.get('/api/personnel/all', routes_api_personnel.index);
app.post('/api/personnel/add', routes_api_personnel.create);
app.post('/api/personnel/destroy/:personnel_id', routes_api_personnel.destroy);

app.get('/api/program/all', routes_api_program.index);
app.post('/api/program/add', routes_api_program.create);
app.post('/api/program/destroy/:program_id', routes_api_program.destroy);

app.get('/api/pipe/all', routes_api_pipe.index);
app.post('/api/pipe/add', routes_api_pipe.create);
app.post('/api/pipe/destroy/:pipe_id', routes_api_pipe.destroy);

app.get('/api/status/all', routes_api_status.index);
app.post('/api/status/add', routes_api_status.create);
app.post('/api/status/destroy/:status_id', routes_api_status.destroy);

app.post('/api/tribute/add', routes_api_tribute.create);


// run server
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

