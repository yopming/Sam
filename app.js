/**
 * Module dependencies.
 */

// mongoose setup
require('./model/schema.js');

var express = require('express');
var http = require('http');
var path = require('path');
var lessMiddleware = require('less-middleware');

var app = express();

// routes
var routes_sam = require('./routes/sam/route.js');
var routes_admin = require('./routes/admin/route.js');
var routes_api_project = require('./routes/api/project.js');
var routes_api_topic = require('./routes/api/topic.js');
var routes_api_mail = require('./routes/api/mail.js');
var routes_api_user = require('./routes/api/user.js');
var routes_api_position = require('./routes/api/position.js');
var routes_api_personnel = require('./routes/api/personnel.js');
var routes_api_pipe = require('./routes/api/pipe.js');
var routes_api_status = require('./routes/api/status.js');
var routes_api_version = require('./routes/api/version.js');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
// less-middleware
// sequence of lessMiddleware and express.static should be like this, not inverse
app.use(lessMiddleware({
    src: __dirname + '/public/less',
    dest: __dirname + '/public/css',
    prefix: '/css',
    compress: true,
    force: true,
    debug: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}


app.get('/sign', routes_admin.sign);
app.get('/admin', routes_admin.admin);
app.get('/admin/sift', routes_admin.admin_sift);

app.get('/admin/password_edit', routes_admin.admin_password_edit);

app.get('/', routes_sam.index);
app.get('/project', routes_sam.project);
app.get('/operation', routes_sam.operation);
app.get('/operation/mail', routes_sam.opt_mail);
app.get('/operation/topic', routes_sam.opt_topic);
app.get('/reference', routes_sam.reference);
app.get('/timeline', routes_sam.timeline);

// APIs
app.get('/api/project/all', routes_api_project.index);
app.get('/api/project/:project_id', routes_api_project.indexOne);
app.post('/api/project/add', routes_api_project.create);
app.post('/api/project/destroy/:project_id', routes_api_project.destroy);
app.post('/api/project/update/:project_id', routes_api_project.update);

app.get('/api/topic/all', routes_api_topic.index);
app.get('/api/topic/:topic_id', routes_api_topic.indexOne);
app.post('/api/topic/add', routes_api_topic.create);
app.post('/api/topic/destroy/:topic_id', routes_api_topic.destroy);
app.post('/api/topic/update/:topic_id', routes_api_topic.update);

app.get('/api/mail/all', routes_api_mail.index);
app.get('/api/mail/:mail_id', routes_api_mail.indexOne);
app.post('/api/mail/add', routes_api_mail.create);
app.post('/api/mail/destroy/:mail_id', routes_api_mail.destroy);
app.post('/api/mail/update/:mail_id', routes_api_mail.update);

app.get('/api/user/all', routes_api_user.index);
app.get('/api/user/:user_id', routes_api_user.indexOne);
app.post('/api/user/add', routes_api_user.create);
app.post('/api/user/destroy/:user_id', routes_api_user.destroy);
app.post('/api/user/update/:user_id', routes_api_user.update);

app.get('/api/position/all', routes_api_position.index);
app.post('/api/position/add', routes_api_position.create);
app.post('/api/position/destroy/:position_id', routes_api_position.destroy);

app.get('/api/personnel/all', routes_api_personnel.index);
app.post('/api/personnel/add', routes_api_personnel.create);
app.post('/api/personnel/destroy/:personnel_id', routes_api_personnel.destroy);

app.get('/api/pipe/all', routes_api_pipe.index);
app.post('/api/pipe/add', routes_api_pipe.create);
app.post('/api/pipe/destroy/:pipe_id', routes_api_pipe.destroy);

app.get('/api/status/all', routes_api_status.index);
app.post('/api/status/add', routes_api_status.create);
app.post('/api/status/destroy/:status_id', routes_api_status.destroy);

app.get('/api/version/all', routes_api_version.index);
app.post('/api/version/add', routes_api_version.create);
app.post('/api/version/destroy/:version_id', routes_api_version.destroy);


// run server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

