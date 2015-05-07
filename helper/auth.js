/*
 * Auth
 */


var mongoose = require('mongoose');
var Domain = mongoose.model('Domain');
var SMTPConnection = require('smtp-connection');


exports.authenticate = function(domain, password, fn) {
    // Connect smtp server
    var conn = new SMTPConnection({
        port: 25,
        host: 'mail3.focuschina.com',
        secure: false,
        ignoreTLS: true
    });
    conn.on('log', function(obj) {
        console.log('obj: ', obj);
    });
    conn.on('error', function(err) {
        fn(err, null);
    });

    conn.connect(function(err) {
        if (err) {
            fn(err, null);
        }
        var auth = {
            user: domain,
            pass: password
        };
        conn.login(auth, function(err) {
            if (err) {
                fn(err, null);
            } else {
                // Query the db, create user if it isn't in db
                Domain.findOne({email: domain}, function(err, result) {
                    if (err) {
                        fn(err, null);
                    }

                    if (result) {
                        fn(null, {
                            email: result.email,
                            group: result.group
                        });
                    } else {
                        new Domain({email: domain, group: '5'}).save(function(err, result) {
                            if (err) {
                                fn(err, null);
                            }
                            fn(null, {
                                email: domain,
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
    if (req.session.email) {
        next();
    } else {
        req.flash('info', '请重新登录');
        res.redirect('/sign');
    }
};