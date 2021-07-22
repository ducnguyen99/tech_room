const passport = require('passport');

module.exports = app => {
    app.get(
        '/auth/google',
        (req, res, next) => {
            console.log("user" + req.user)
            next()
        },
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );


    app.get(
        '/auth/google/callback',
        passport.authenticate('google'),
        (req, res) => {
            console.log("after" + req.user)
            res.redirect('/blogs');
        }
    );

    app.get('/auth/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};