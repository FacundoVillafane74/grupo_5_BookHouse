let middlewares = {
    auth: (req, res, next) => {
        if(req.session.user) {
            next();
        } else {
            res.redirect('/user/login');
        }
    },

    guest: (req, res, next) => {
        if(!req.session.user) {
            next();
        } else {
            res.redirect('/');
        }
    },

    admin: (req, res, next) => {
        if(req.session.user && req.session.user.rol_id == 1) {
            next();
        } else {
            res.redirect('/');
        }
    },
};

module.exports = middlewares;