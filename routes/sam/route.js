/*
 * Sam 
 * GET
 */

exports.index = function(req, res) {
    res.render('sam/index');
};


//
// project
exports.project = function(req, res) {
    res.render('sam/project/project');
};


//
// operation
exports.operation = function(req, res) {
    res.render('sam/operation/operation');
};
// operation-mail
exports.opt_mail = function(req, res) {
    res.render('sam/operation/mail');
};
// operation-topic
exports.opt_topic = function(req, res) {
    res.render('sam/operation/topic');
};


//
// reference
exports.reference = function(req, res) {
    res.render('sam/reference/reference');
};


//
// timeline
exports.timeline = function(req, res) {
    res.render('sam/timeline/timeline');
};
