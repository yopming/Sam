/*
 * Admin
 * GET
 */

// sign
exports.sign = function(req, res) {
    res.render('admin/sign');
};

// admin
exports.admin = function(req, res) {
    res.render('admin/admin');
};

// sift
exports.admin_sift = function(req, res) {
    res.render('admin/sift');
};

// project
exports.admin_project = function(req, res) {
    res.render('admin/project');
};

// mail
exports.admin_mail = function(req, res) {
    res.render('admin/mail');
};

// topic
exports.admin_topic = function(req, res) {
    res.render('admin/topic');
};

// user
exports.admin_user = function(req, res) {
    res.render('admin/user');
};

// parameter
exports.admin_parameter = function(req, res) {
    res.render('admin/parameter');
};
exports.admin_parameter_position = function(req, res) {
    res.render('admin/parameter/position');
};
exports.admin_parameter_personnel = function(req, res) {
    res.render('admin/parameter/personnel');
};
exports.admin_parameter_projectStatus = function(req, res) {
    res.render('admin/parameter/projectStatus');
};
exports.admin_parameter_projectVersion = function(req, res) {
    res.render('admin/parameter/projectVersion');
};
exports.admin_parameter_releasePipe = function(req, res) {
    res.render('admin/parameter/releasePipe');
};

// modify password
exports.admin_password_edit = function(req, res) {
    res.render('admin/password_edit');
};
