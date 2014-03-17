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

// modify password
exports.admin_password_edit = function(req, res) {
    res.render('admin/password_edit');
};
