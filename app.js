/**
 * Module dependencies.
 */

var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var flash = require('express-flash');
var minify = require('express-minify');
var compression = require('compression');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var serveStatic = require('serve-static');
var serveFavicon = require('serve-favicon');
var morgan = require('morgan');
var FileStreamRotator = require('file-stream-rotator');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var lessMiddleware = require('less-middleware');

// mongoose setup
require('./model/schema.js');

// helper
var helper_auth = require('./helper/auth.js');

// application
var app = express();

// log directory
var logDirectory = path.join(__dirname, 'log');
// ensure log directory exists
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
var accessLogStream = FileStreamRotator.getStream({
	skip: function(req, res) {return res.statusCode < 400; },
	filename: path.join(logDirectory, 'log-%DATE%.log'),
	date_format: "YYYY-MM-DD",
	frequency: 'daily',
	verbose: false
});

// routes
var routes_sam = require('./route/sam/route.js');
var routes_share = require('./route/sam/share.js');
var routes_admin = require('./route/admin/route.js');
var routes_api_task = require('./route/api/task.js');
var routes_api_share = require('./route/api/share.js');
var routes_api_domain = require('./route/api/domain.js');
var routes_api_position = require('./route/api/position.js');
var routes_api_personnel = require('./route/api/personnel.js');
var routes_api_program = require('./route/api/program.js');
var routes_api_pipe = require('./route/api/pipe.js');
var routes_api_period = require('./route/api/period.js');

// all environments
app.use(compression());

// less-middleware
// sequence of lessMiddleware and express.static should be like this, not inverse
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(serveStatic(path.join(__dirname, 'public')));

app.use(cookieParser('samcookies'));
app.use(session({
	secret: 'samsessions',
	resave: true,
	saveUninitialized: true
}));

app.set('port', process.env.PORT || 1080);
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'jade');
app.use(flash());
app.use(morgan('combined', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')));

// routers
app.get('/', routes_sam.index);
app.get('/share/presentation/:share_id', routes_share.display);

app.get('/sign', routes_admin.sign);
app.post('/signin', routes_admin.signin);
app.get('/signout', helper_auth.requiredAuth, routes_admin.signout);
app.get('/admin', helper_auth.requiredAuth, routes_admin.admin);

// APIs
// API - Data
app.get('/api/task/all', routes_api_task.index);
app.get('/api/task/all/:sequence', routes_api_task.indexSort);
app.get('/api/task/:task_id', routes_api_task.indexOne);
app.get('/api/task/:category/all', routes_api_task.categoryIndex);
app.post('/api/task/:category/add', routes_api_task.create);
app.post('/api/task/:category/destroy/:task_id', routes_api_task.destroy);
app.post('/api/task/:category/update/:task_id', routes_api_task.update);

app.get('/api/share/all', routes_api_share.index);
app.get('/api/share/:share_id', routes_api_share.indexOne);
app.post('/api/share/add', routes_api_share.create);
app.post('/api/share/destroy/:share_id', routes_api_share.destroy);
app.post('/api/share/update/:share_id', routes_api_share.update);

app.get('/api/domain/all', routes_api_domain.index);
app.post('/api/domain/promote/:domain_id', routes_api_domain.promote);
app.post('/api/domain/demote/:domain_id', routes_api_domain.demote);

app.get('/api/position/all', routes_api_position.index);
app.post('/api/position/add', routes_api_position.create);
app.post('/api/position/remove/:position_id', routes_api_position.remove);
app.post('/api/position/destroy/:position_id', routes_api_position.destroy);

app.get('/api/personnel/all', routes_api_personnel.index);
app.post('/api/personnel/add', routes_api_personnel.create);
app.post('/api/personnel/remove/:personnel_id', routes_api_personnel.remove);
app.post('/api/personnel/destroy/:personnel_id', routes_api_personnel.destroy);

app.get('/api/program/all', routes_api_program.index);
app.post('/api/program/add', routes_api_program.create);
app.post('/api/program/remove/:program_id', routes_api_program.remove);
app.post('/api/program/destroy/:program_id', routes_api_program.destroy);

app.get('/api/pipe/all', routes_api_pipe.index);
app.post('/api/pipe/add', routes_api_pipe.create);
app.post('/api/pipe/remove/:pipe_id', routes_api_pipe.remove);
app.post('/api/pipe/destroy/:pipe_id', routes_api_pipe.destroy);

app.get('/api/period/years', routes_api_period.years);
app.get('/api/period/months', routes_api_period.months);

// 404 & 500 exception
app.get('/error', routes_sam.error);
app.get('*', routes_sam.notfound);

// jade session
app.use(function (req, res, next) {
	res.locals.email = req.session.email || null;
	res.locals.group = req.session.group || null;
	next();
});

// minify
app.use(function (req, res, next) {
	// do not mangle -angular.js files
	if (/-angular\.js$/.test(req.url)) {
		res._no_mangle = true;
	}
	next();
});
app.use(minify());

// development only
if ('development' == app.get('env')) {
	app.use(errorHandler());
}

// run server
http.createServer(app).listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
