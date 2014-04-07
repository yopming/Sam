/*
 * Auth
 */

var crypto = require('crypto');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var SaltLength = 8;

function md5(string) {
  return crypto.createHash('md5').update(string).digest('hex');
}

function generateSalt(len) {
  var sets = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var setsLen = sets.length;
  var salt = '';
  for (var i=0; i<len; i++) {
    var p = Math.floor(Math.random() * setsLen);
    salt += sets[p];
  }
  return salt;
}

function createHash(password) {
  var salt = generateSalt(SaltLength);
  var hash = md5(password + salt);
  return salt + hash;
}

function validateHash(hash, password) {
  var salt = hash.substr(0, SaltLength);
  var validHash = salt + md5(password + salt);
  return hash === validHash;
}


function authenticate(username, password, fn) {
  if (!module.parent)
    console.log('Authenticating %s:%s', username, password);

  User.findOne({
    username: username
  }, function(err, user) {
    if (user) {
      if (err) {
        return fn(new Error('User is not exist.'));
      }
      if (validateHash(user.hash, password)) {
        return fn(null, user);
      } else {
        fn(new Error('Invalid password.'));
      }
    } else {
      return fn(new Error('User is not exist.'));
    }
  });
}

function requiredAuth(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    req.flash('info', 'Please sign in first.');
    res.redirect('/sign');
  }
}

module.exports = {
  'createHash': createHash,
  'validateHash': validateHash,
  'authenticate': authenticate,
  'requiredAuth': requiredAuth
};
