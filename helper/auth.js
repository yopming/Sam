/*
 * Auth
 */


var mongoose = require('mongoose');
var User = mongoose.model('User');
var SMTPConnection = require('smtp-connection');


exports.authenticate = function(username, password, fn) {
    // Connect smtp server
    var conn = new SMTPConnection({
        port: 25,
        host: 'mail3.focuschina.com',
        secure: false,
        ignoreTLS: true
    });
    conn.on('log', function(obj) {
        console.log(obj);
    });
    conn.on('error', function(err) {
        fn(err);
    });

    conn.connect(function(err) {
        if (err) {
            console.log('-1');
            fn(err);
        }
        var auth = {
            user: username,
            pass: password
        };
        conn.login(auth, function(err) {
            if (err) {
                console.log('0');
                fn(err);
            } else {
                // Query the db, create user if it isn't in db
                User.findOne({
                    email: username
                }, function(err, user) {
                    if (err) {
                        console.log('1');
                        fn(err);
                    }

                    if (user) {
                        fn('user', {
                            email: user.email,
                            group: user.group
                        });
                    } else {
                        new User({
                            email: username,
                            group: '5'
                        }).save(function(err, user) {
                            if (err) {
                                console.log('2');
                                fn(err);
                            }
                            fn('user', {
                                email: username,
                                group: '5'
                            });
                        });
                    }
                });
            }
            conn.quit();
        });
    });
};


exports.requiredAuth = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        req.flash('info', 'Please sign in first.');
        res.redirect('/sign');
    }
};
